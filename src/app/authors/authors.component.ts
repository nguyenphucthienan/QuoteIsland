import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { QuoteCardHelpers } from '../core/helpers/quote-card.helper';
import { Pagination } from '../core/models/pagination.interface';
import { AuthorService } from '../core/services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.authorsPage;
  readonly modalSortOptions: any[] = [
    { name: 'Alphabetical', id: '+fullName', iconClassName: 'fa fa-sort-alpha-asc' },
    { name: 'Latest', id: '-createdAt', iconClassName: 'fa fa-clock-o' },
    { name: 'Most Love', id: '+loveCount', iconClassName: 'fa fa-heart' }
  ];

  authors: any[] = [];
  pagination: Pagination;
  sortString: string;

  constructor(private route: ActivatedRoute,
    private authorService: AuthorService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'].items;
      this.pagination = data['authors'].pagination;
    });
  }

  getAuthors() {
    this.authorService.getAuthors(this.pagination.pageNumber,
      this.pagination.pageSize, this.sortString)
      .subscribe((response: any) => {
        this.authors = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.getAuthors();
  }

  onSortChanged(sortString: string) {
    this.sortString = sortString;
    this.getAuthors();
  }

  getColorClass(index: number) {
    return QuoteCardHelpers.getColorClass(index);
  }

}
