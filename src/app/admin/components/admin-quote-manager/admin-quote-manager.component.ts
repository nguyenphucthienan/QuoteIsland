import { Component, ComponentRef, NgModuleRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { environment } from 'src/environments/environment';

import { AdminQuoteAddModalComponent } from '../../modals/admin-quote-add-modal/admin-quote-add-modal.component';
import { AdminQuoteManagerTableService } from '../../services/admin-quote-manager-table.service';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss'],
  providers: [AdminQuoteManagerTableService]
})
export class AdminQuoteManagerComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild(AdminQuoteAddModalComponent) addModal;

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(public adminQuoteManagerTableService: AdminQuoteManagerTableService,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
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

}
