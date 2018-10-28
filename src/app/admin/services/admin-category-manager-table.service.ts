import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableService } from 'src/app/shared/components/datatable/services/table.service';

@Injectable()
export class AdminCategoryManagerTableService extends TableService {

  private readonly headElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'name', name: 'Full Name' },
    { id: 'description', name: 'Description' },
    { id: 'quoteCount', name: 'Quotes' },
    { id: 'loveCount', name: 'Loves' }
  ];

  constructor(private categoryService: CategoryService) {
    super();
  }

  getHeaders() {
    return this.headElements;
  }

  async getData() {
    return await this.categoryService.getCategories(
      this.pagination.pageNumber,
      this.pagination.pageSize)
      .pipe(
        map((response: any) => {
          this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }

  async getTableData() {
    const items = await this.getData();
    return items.map(category => {
      return {
        id: category._id,
        shortenedId: category._id.substr(-4),
        name: category.name,
        description: category.description,
        quoteCount: category.quoteCount,
        loveCount: category.loveCount
      };
    });
  }

}
