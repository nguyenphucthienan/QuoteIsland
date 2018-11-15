import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { CardHelpers } from '../core/helpers/card.helper';
import { Author } from '../core/models/author.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { AuthorService } from '../core/services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.authorsPage;
  readonly modalTitle = 'Sort Authors';

  readonly modalSortOptions: any[] = [
    {
      name: 'Alphabetical',
      iconClassName: 'fa fa-sort-alpha-asc',
      sortMode: { sortBy: 'fullName', isSortAscending: true }
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

  authors: Author[] = [];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true
  };

  constructor(private route: ActivatedRoute,
    private authorService: AuthorService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.authors = data['authors'].items;
      this.pagination = data['authors'].pagination;
    });
  }

  getAuthors() {
    this.authorService.getAuthors(this.pagination, this.sortMode)
      .subscribe((response: any) => {
        this.authors = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.getAuthors();
  }

  onSortChanged(sortMode: SortMode) {
    this.sortMode = sortMode;
    this.getAuthors();
  }

  getColorClass(index: number) {
    return CardHelpers.getColorClass(index);
  }

}
