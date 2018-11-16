import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/core/models/author.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Quote } from 'src/app/core/models/quote.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { SortOption } from 'src/app/core/models/sort-option.interface';
import { QuoteService } from 'src/app/core/services/quote.service';
import { CardUtils } from 'src/app/utils/card-utils';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

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

  author: Author;
  quotes: Quote[] = [];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true
  };

  constructor(private route: ActivatedRoute,
    private quoteService: QuoteService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.author = data['author'];
      this.quotes = data['quotes'].items;
      this.pagination = data['quotes'].pagination;
    });
  }

  getQuotes() {
    this.quoteService.getQuotes(this.pagination,
      this.sortMode, { author: this.author._id })
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
