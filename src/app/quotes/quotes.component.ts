import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Pagination } from '../core/models/pagination.interface';
import { Quote } from '../core/models/quote.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { SortOption } from '../core/models/sort-option.interface';
import { QuoteService } from '../core/services/quote.service';
import { CardUtils } from '../utils/card-utils';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.quotesPage;
  readonly modalTitle = 'Sort Quotes';

  readonly modalSortOptions: SortOption[] = [
    {
      name: 'Alphabetical',
      iconClassName: 'fa fa-sort-alpha-asc',
      sortMode: { sortBy: 'text', isSortAscending: true }
    },
    {
      name: 'Latest',
      iconClassName: 'fa fa-clock-o',
      sortMode: { sortBy: 'createdAt', isSortAscending: false }
    },
    {
      name: 'Most Love',
      iconClassName: 'fa fa-heart',
      sortMode: { sortBy: 'loveCount', isSortAscending: false }
    }
  ];

  quotes: Quote[] = [];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.quotes = data['quotes'].items;
      this.pagination = data['quotes'].pagination;
    });
  }

  getQuotes() {
    this.quoteService.getQuotes(this.pagination, this.sortMode)
      .subscribe((response: any) => {
        this.quotes = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.getQuotes();
  }

  onSortChanged(sortMode: SortMode) {
    this.sortMode = sortMode;
    this.getQuotes();
  }

  getColorClass(index: number) {
    return CardUtils.getColorClass(index);
  }

}
