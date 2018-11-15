import { Component, ComponentRef, NgModuleRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';

import { AdminAuthorAddModalComponent } from '../../modals/admin-author-add-modal/admin-author-add-modal.component';
import { AdminAuthorManagerTableService } from '../../services/admin-author-manager-table.service';

@Component({
  selector: 'app-admin-author-manager',
  templateUrl: './admin-author-manager.component.html',
  styleUrls: ['./admin-author-manager.component.scss'],
  providers: [AdminAuthorManagerTableService]
})
export class AdminAuthorManagerComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminAuthorManagerTableService: AdminAuthorManagerTableService,
    private authorService: AuthorService,
    private alertService: AlertService,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
  }

  openAddModal() {
    this.modalComponentRef = this.modalService.open(AdminAuthorAddModalComponent, {
      inputs: {
        title: 'Add New Author'
      },
      childComponent: {
        outputs: {
          authorAdded: this.onAuthorAdded.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onAuthorAdded() {
    this.modalComponentRef.instance.close();
    this.datatable.refresh();
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.Edit:
        this.editAuthor(tableCellChange.row.cells['_id'].value);
        break;
      case TableActionType.Delete:
        this.deleteAuthor(tableCellChange.row.cells['_id'].value);
        break;
    }
  }

  editAuthor(id: string) {
    console.log('Edit', id);
  }

  deleteAuthor(id: string) {
    this.modalComponentRef = this.modalService.open(ConfirmModalComponent, {
      inputs: {
        title: 'Confirm'
      },
      childComponent: {
        inputs: {
          content: 'Are you sure you want to delete this author?'
        },
        outputs: {
          ok: this.confirmDeleteAuthor.bind(this, id),
          cancel: this.cancelDeleteAuthor.bind(this)
        }
      }
    });
  }

  confirmDeleteAuthor(id: string) {
    this.authorService.deleteAuthor(id)
      .subscribe(
        () => {
          this.modalComponentRef.instance.close();
          this.alertService.success('Delete author successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete author failed')
      );
  }

  cancelDeleteAuthor() {
    this.modalComponentRef.instance.close();
  }

}
