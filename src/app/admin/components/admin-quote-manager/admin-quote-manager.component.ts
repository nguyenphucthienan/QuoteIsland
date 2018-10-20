import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss']
})
export class AdminQuoteManagerComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.adminPage;

  headElements: any = [
    { id: 'id', name: 'ID' },
    { id: 'author', name: 'Author' },
    { id: 'categories', name: 'Categories' },
    { id: 'text', name: 'Text' }
  ];

  elements: any = [];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes()
      .subscribe(quotes => this.elements = this.populateQuotesData(quotes));
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

}
