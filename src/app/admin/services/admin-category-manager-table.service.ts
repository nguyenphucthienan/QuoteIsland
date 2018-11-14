import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StringHelpers } from 'src/app/core/helpers/string.helper';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableHeader } from 'src/app/datatable/models/table-header.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminCategoryManagerTableService implements TableService {

  headers: TableHeader[] = [
    { name: 'shortenedId', text: 'ID', type: 'TextTableCellComponent' },
    { name: 'name', text: 'Full Name', type: 'TextTableCellComponent' },
    { name: 'description', text: 'Description', type: 'TextTableCellComponent' },
    { name: 'quoteCount', text: 'Quotes', type: 'TextTableCellComponent' },
    { name: 'loveCount', text: 'Loves', type: 'TextTableCellComponent' }
  ];

  elements: any[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  constructor(private categoryService: CategoryService) { }

  getHeaders() {
    return this.headers;
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
        name: category._id,
        shortenedId: category._id.substr(-4),
        text: category.name,
        description: StringHelpers.truncate(category.description, 100),
        quoteCount: category.quoteCount,
        loveCount: category.loveCount
      };
    });
  }

}
