import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { QuoteCardHelpers } from '../core/helpers/quote-card.helper';
import { Pagination } from '../core/models/pagination.interface';
import { QuoteService } from '../core/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.quotesPage;
  quotesPerPage = 8;

  quotes: any[] = [];
  pagination: Pagination;

  constructor(private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.quotes = data['quotes'].items;
      this.pagination = data['quotes'].pagination;
    });
  }

  getQuotes(pageNumber: number, pageSize: number) {
    this.quoteService.getQuotes(pageNumber, pageSize)
      .subscribe((response: any) => {
        this.quotes = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(page: number) {
    this.getQuotes(page, this.quotesPerPage);
  }

  getColorClass(index: number) {
    return QuoteCardHelpers.getColorClass(index);
  }

}
