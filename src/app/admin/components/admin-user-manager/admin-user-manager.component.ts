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
import { UserService } from 'src/app/core/services/user.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';

import { AdminUserAddModalComponent } from '../../modals/admin-user-add-modal/admin-user-add-modal.component';
import { AdminUserEditModalComponent } from '../../modals/admin-user-edit-modal/admin-user-edit-modal.component';
import { AdminUserManagerTableService } from '../../services/admin-user-manager-table.service';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.scss'],
  providers: [AdminUserManagerTableService]
})
export class AdminUserManagerComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('search') search: ElementRef;

  searchSubscription: Subscription;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminUserManagerTableService: AdminUserManagerTableService,
    private userService: UserService,
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
        tap((value: string) => this.searchUser(value))
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

  searchUser(value: string) {
    this.adminUserManagerTableService.filterMode['username'] = value;
    this.datatable.refresh();
  }

  openAddModal() {
    this.modalComponentRef = this.modalService.open(AdminUserAddModalComponent, {
      inputs: {
        title: 'Add New User'
      },
      childComponent: {
        outputs: {
          userAdded: this.onUserAdded.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onUserAdded() {
    this.modalComponentRef.instance.close();
    this.datatable.refresh();
  }

  openEditModal(rowData: TableRow) {
    this.modalComponentRef = this.modalService.open(AdminUserEditModalComponent, {
      inputs: {
        title: 'Edit User'
      },
      childComponent: {
        inputs: {
          rowData
        },
        outputs: {
          userEdited: this.onUserEdited.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onUserEdited() {
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
          content: 'Are you sure you want to delete this user?'
        },
        outputs: {
          ok: this.confirmDeleteUser.bind(this, id),
          cancel: this.cancelDeleteUser.bind(this)
        }
      }
    });
  }

  confirmDeleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        () => {
          this.modalComponentRef.instance.close();
          this.alertService.success('Delete user successfully');
          this.datatable.refresh();
        },
        () => this.alertService.error('Delete user failed')
      );
  }

  cancelDeleteUser() {
    this.modalComponentRef.instance.close();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
