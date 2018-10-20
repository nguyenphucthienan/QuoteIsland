import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuoteCardHelpers } from '../core/helpers/quote-card.helper';

import { QuoteService } from '../core/services/quote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.quotesPage;
  quotesPerPage = 8;

  quotes: any[] = [];

  constructor(private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.quotes = data['quotes'];
    });
  }

  getQuotes(page: number, offset: number) {
    this.quoteService.getQuotes(page, offset)
      .subscribe((quotes: any[]) => this.quotes = quotes);
  }

  onPageChanged(page: number) {
    this.getQuotes(page, this.quotesPerPage);
  }

  getColorClass(index: number) {
    return QuoteCardHelpers.getColorClass(index);
  }

}
