import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Category } from '../core/models/category.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';
import { SortOption } from '../core/models/sort-option.interface';
import { CategoryService } from '../core/services/category.service';
import { CardUtils } from '../utils/card-utils';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.categoriesPage;
  readonly modalTitle = 'Sort Categories';

  readonly modalSortOptions: SortOption[] = [
    {
      name: 'Alphabetical',
      iconClassName: 'fa fa-sort-alpha-asc',
      sortMode: { sortBy: 'name', isSortAscending: true }
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

  categories: Category[] = [];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.categories = data['categories'].items;
      this.pagination = data['categories'].pagination;
    });
  }

  getAuthors() {
    this.categoryService.getCategories(this.pagination, this.sortMode)
      .subscribe((response: any) => {
        this.categories = response.items;
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
    return CardUtils.getColorClass(index);
  }

}
