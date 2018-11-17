import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  NgModuleRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, switchAll, tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';

import { AdminQuoteAddModalComponent } from '../../modals/admin-quote-add-modal/admin-quote-add-modal.component';
import { AdminQuoteEditModalComponent } from '../../modals/admin-quote-edit-modal/admin-quote-edit-modal.component';
import { AdminQuoteManagerTableService } from '../../services/admin-quote-manager-table.service';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss'],
  providers: [AdminQuoteManagerTableService]
})
export class AdminQuoteManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminQuoteManagerTableService: AdminQuoteManagerTableService,
    private quoteService: QuoteService,
    private alertService: AlertService,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(250),
        tap((value: string) => this.searchQuote(value)),
        switchAll()
      )
      .subscribe();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.Edit:
        this.openEditModal(tableCellChange.row);
        break;
      case TableActionType.Delete:
        this.openDeleteModal(tableCellChange.row.cells['_id'].value);
        break;
    }
  }

  searchQuote(value: string) {
    this.adminQuoteManagerTableService.filterMode['text'] = value;
    this.datatable.refresh();
  }


  openAddModal() {
    this.modalComponentRef = this.modalService.open(AdminQuoteAddModalComponent, {
      inputs: {
        title: 'Add New Quote'
      },
      childComponent: {
        outputs: {
          quoteAdded: this.onQuoteAdded.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onQuoteAdded() {
    this.modalComponentRef.instance.close();
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.modalComponentRef = this.modalService.open(AdminQuoteEditModalComponent, {
      inputs: {
        title: 'Edit Quote'
      },
      childComponent: {
        inputs: {
          rowData
        },
        outputs: {
          quoteEdited: this.onQuoteEdited.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onQuoteEdited() {
    this.modalComponentRef.instance.close();
    this.datatable.refresh();
  }

  openDeleteModal(id: string) {
    this.modalComponentRef = this.modalService.open(ConfirmModalComponent, {
      inputs: {
        title: 'Confirm'
      },
      childComponent: {
        inputs: {
          content: 'Are you sure you want to delete this quote?'
        },
        outputs: {
          ok: this.confirmDeleteQuote.bind(this, id),
          cancel: this.cancelDeleteQuote.bind(this)
        }
      }
    });
  }

  confirmDeleteQuote(id: string) {
    this.quoteService.deleteQuote(id)
      .subscribe(
        () => {
          this.modalComponentRef.instance.close();
          this.alertService.success('Delete quote successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete quote failed')
      );
  }

  cancelDeleteQuote() {
    this.modalComponentRef.instance.close();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
