import { Component, ComponentRef, NgModuleRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
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

  onTableCellChanged(event: any) {
    console.log('onTableCellChanged', event);
  }

}
