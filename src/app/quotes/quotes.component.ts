import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { CardHelpers } from '../core/helpers/card.helper';
import { Pagination } from '../core/models/pagination.interface';
import { QuoteService } from '../core/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.quotesPage;
  readonly modalTitle = 'Sort Quotes';
  readonly modalSortOptions: any[] = [
    { name: 'Alphabetical', id: '+text', iconClassName: 'fa fa-sort-alpha-asc' },
    { name: 'Latest', id: '-createdAt', iconClassName: 'fa fa-clock-o' },
    { name: 'Most Love', id: '-loveCount', iconClassName: 'fa fa-heart' }
  ];

  quotes: any[] = [];
  pagination: Pagination;
  sortString: string;

  constructor(private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.quotes = data['quotes'].items;
      this.pagination = data['quotes'].pagination;
    });
  }

  getQuotes() {
    this.quoteService.getQuotes(this.pagination.pageNumber,
      this.pagination.pageSize, this.sortString)
      .subscribe((response: any) => {
        this.quotes = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.getQuotes();
  }

  onSortChanged(sortString: string) {
    this.sortString = sortString;
    this.getQuotes();
  }

  getColorClass(index: number) {
    return CardHelpers.getColorClass(index);
  }

}
