import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardHelpers } from 'src/app/core/helpers/card.helper';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { QuoteService } from 'src/app/core/services/quote.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

  readonly modalTitle = 'Sort Quotes';
  readonly modalSortOptions: any[] = [
    { name: 'Alphabetical', id: '+text', iconClassName: 'fa fa-sort-alpha-asc' },
    { name: 'Latest', id: '-createdAt', iconClassName: 'fa fa-clock-o' },
    { name: 'Most Love', id: '-loveCount', iconClassName: 'fa fa-heart' }
  ];

  author: any;
  quotes: any[] = [];
  pagination: Pagination;
  sortString: string;

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
    this.quoteService.getQuotesByAuthor(
      this.author._id,
      this.pagination.pageNumber,
      this.pagination.pageSize,
      this.sortString)
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
