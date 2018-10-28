import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { DatatableComponent } from 'src/app/shared/components/datatable/datatable.component';
import { environment } from 'src/environments/environment';

import { AdminQuoteManagerTableService } from '../../services/admin-quote-manager-table.service';
import { AdminQuoteAddModalComponent } from './admin-quote-add-modal/admin-quote-add-modal.component';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss']
})
export class AdminQuoteManagerComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild(AdminQuoteAddModalComponent) addModal;

  constructor(public adminQuoteManagerTableService: AdminQuoteManagerTableService,
    private quoteService: QuoteService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  addQuote(rawQuote) {
    this.quoteService.createQuote(rawQuote)
      .subscribe(
        () => {
          this.alertService.success('Add quote successfully');
          this.addModal.reset();
          this.datatable.refresh();
        },
        error => this.alertService.error('Add quote failed')
      );
  }

}
