import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { environment } from 'src/environments/environment';

import { AdminQuoteAddModalComponent } from './admin-quote-add-modal/admin-quote-add-modal.component';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss']
})
export class AdminQuoteManagerComponent implements OnInit {

  @ViewChild(AdminQuoteAddModalComponent) addModal;

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  readonly headElements: any = [
    { id: 'id', name: 'ID' },
    { id: 'author', name: 'Author' },
    { id: 'categories', name: 'Categories' },
    { id: 'text', name: 'Text' }
  ];

  elements: any = [];

  constructor(private quoteService: QuoteService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getQuotes();
  }

  private getQuotes() {
    this.quoteService.getQuotes()
      .subscribe((response: any) => {
        this.elements = this.populateQuotesData(response.items);
      });
  }

  private populateQuotesData(quotes) {
    return quotes.map(quote => {
      return {
        id: quote._id,
        author: quote.author && quote.author.fullName,
        categories: quote.categories && quote.categories
          .map(category => category.name)
          .join(', '),
        text: quote.text
      };
    });
  }

  addQuote(rawQuote) {
    this.quoteService.createQuote(rawQuote)
      .subscribe(
        () => {
          this.alertService.success('Add quote successfully');
          this.addModal.reset();
          this.getQuotes();
        },
        error => this.alertService.error('Add quote failed')
      );
  }

}
