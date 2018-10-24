import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagination } from '../core/models/pagination.interface';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../core/services/category.service';
import { CardHelpers } from '../core/helpers/card.helper';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.categoriesPage;
  readonly modalTitle = 'Sort Categories';
  readonly modalSortOptions: any[] = [
    { name: 'Alphabetical', id: '+name', iconClassName: 'fa fa-sort-alpha-asc' },
    { name: 'Latest', id: '-createdAt', iconClassName: 'fa fa-clock-o' },
    { name: 'Most Love', id: '+loveCount', iconClassName: 'fa fa-heart' }
  ];

  categories: any[] = [];
  pagination: Pagination;
  sortString: string;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.categories = data['categories'].items;
      this.pagination = data['categories'].pagination;
    });
  }

  getAuthors() {
    this.categoryService.getCategories(this.pagination.pageNumber,
      this.pagination.pageSize, this.sortString)
      .subscribe((response: any) => {
        this.categories = response.items;
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
    return CardHelpers.getColorClass(index);
  }

}
