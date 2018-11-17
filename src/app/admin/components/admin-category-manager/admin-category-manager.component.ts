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
import { debounceTime, map, tap } from 'rxjs/operators';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';

import { AdminCategoryAddModalComponent } from '../../modals/admin-category-add-modal/admin-category-add-modal.component';
import { AdminCategoryEditModalComponent } from '../../modals/admin-category-edit-modal/admin-category-edit-modal.component';
import { AdminCategoryManagerTableService } from '../../services/admin-category-manager-table.service';

@Component({
  selector: 'app-admin-category-manager',
  templateUrl: './admin-category-manager.component.html',
  styleUrls: ['./admin-category-manager.component.scss'],
  providers: [AdminCategoryManagerTableService]
})
export class AdminCategoryManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminCategoryManagerTableService: AdminCategoryManagerTableService,
    private categoryService: CategoryService,
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
        tap((value: string) => this.searchCategory(value))
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

  searchCategory(value: string) {
    this.adminCategoryManagerTableService.filterMode['name'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.modalComponentRef = this.modalService.open(AdminCategoryAddModalComponent, {
      inputs: {
        title: 'Add New Category'
      },
      childComponent: {
        outputs: {
          categoryAdded: this.onCategoryAdded.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onCategoryAdded() {
    this.modalComponentRef.instance.close();
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.modalComponentRef = this.modalService.open(AdminCategoryEditModalComponent, {
      inputs: {
        title: 'Edit Category'
      },
      childComponent: {
        inputs: {
          rowData
        },
        outputs: {
          categoryEdited: this.onCategoryEdited.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onCategoryEdited() {
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
          content: 'Are you sure you want to delete this category?'
        },
        outputs: {
          ok: this.confirmDeleteCategory.bind(this, id),
          cancel: this.cancelDeleteCategory.bind(this)
        }
      }
    });
  }

  confirmDeleteCategory(id: string) {
    this.categoryService.deleteCategory(id)
      .subscribe(
        () => {
          this.modalComponentRef.instance.close();
          this.alertService.success('Delete category successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete category failed')
      );
  }

  cancelDeleteCategory() {
    this.modalComponentRef.instance.close();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
