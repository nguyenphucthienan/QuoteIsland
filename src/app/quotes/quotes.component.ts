import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuoteCardHelpers } from '../core/helpers/quote-card.helper';

import { QuoteService } from '../core/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.quotesPage;

  quotes: any[] = [];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.getQuotes(1, 8);
  }

  getQuotes(page: number, offset: number) {
    this.quoteService.getQuotes(page, offset)
      .subscribe((quotes: any[]) => this.quotes = quotes);
  }

  getColorClass(index: number) {
    return QuoteCardHelpers.getColorClass(index);
  }

}
