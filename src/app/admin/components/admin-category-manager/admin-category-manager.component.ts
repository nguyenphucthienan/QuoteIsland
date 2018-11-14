import { Component, ComponentRef, NgModuleRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { environment } from 'src/environments/environment';

import { AdminCategoryAddModalComponent } from '../../modals/admin-category-add-modal/admin-category-add-modal.component';
import { AdminCategoryManagerTableService } from '../../services/admin-category-manager-table.service';

@Component({
  selector: 'app-admin-category-manager',
  templateUrl: './admin-category-manager.component.html',
  styleUrls: ['./admin-category-manager.component.scss'],
  providers: [AdminCategoryManagerTableService]
})
export class AdminCategoryManagerComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminCategoryManagerTableService: AdminCategoryManagerTableService,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
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

}
