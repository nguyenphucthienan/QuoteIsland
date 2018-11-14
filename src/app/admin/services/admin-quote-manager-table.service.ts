import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StringHelpers } from 'src/app/core/helpers/string.helper';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { QuoteService } from 'src/app/core/services/quote.service';
import { TableHeader } from 'src/app/datatable/models/table-header.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminQuoteManagerTableService implements TableService {

  headers: TableHeader[] = [
    { name: 'shortenedId', text: 'ID', type: 'TextTableCellComponent' },
    { name: 'author', text: 'Author', type: 'TextTableCellComponent' },
    { name: 'categories', text: 'Categories', type: 'TextTableCellComponent' },
    { name: 'text', text: 'Text', type: 'TextTableCellComponent' },
    { name: 'loveCount', text: 'Loves', type: 'TextTableCellComponent' }
  ];

  elements: any[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  constructor(private quoteService: QuoteService) { }

  getHeaders() {
    return this.headers;
  }

  getRawData() {
    return this.quoteService.getQuotes(
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
    return this.elements.map(quote => {
      return {
        name: quote._id,
        shortenedId: quote._id.substr(-4),
        author: quote.author && quote.author.fullName,
        categories: quote.categories && quote.categories
          .map(category => category.name)
          .join(', '),
        text: StringHelpers.truncate(quote.text, 100),
        loveCount: quote.loveCount
      };
    });
  }

}
