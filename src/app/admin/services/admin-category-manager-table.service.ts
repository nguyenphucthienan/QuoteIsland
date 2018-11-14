import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StringHelpers } from 'src/app/core/helpers/string.helper';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminCategoryManagerTableService implements TableService {

  elements: any[];
  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly headerElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'name', name: 'Full Name' },
    { id: 'description', name: 'Description' },
    { id: 'quoteCount', name: 'Quotes' },
    { id: 'loveCount', name: 'Loves' }
  ];

  constructor(private categoryService: CategoryService) { }

  getHeaders() {
    return this.headerElements;
  }

  getRawData() {
    return this.categoryService.getCategories(
      this.pagination.pageNumber,
      this.pagination.pageSize)
      .pipe(
        map((response: any) => {
          this.elements = response.items;
          this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }

  async getDataRows() {
    await this.getRawData();
    return this.elements.map(category => {
      return {
        id: category._id,
        shortenedId: category._id.substr(-4),
        name: category.name,
        description: StringHelpers.truncate(category.description, 100),
        quoteCount: category.quoteCount,
        loveCount: category.loveCount
      };
    });
  }

}
