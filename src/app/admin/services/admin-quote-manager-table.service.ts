import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StringHelpers } from 'src/app/core/helpers/string.helper';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { QuoteService } from 'src/app/core/services/quote.service';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminQuoteManagerTableService implements TableService {

  elements: any[];
  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly headerElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'author', name: 'Author' },
    { id: 'categories', name: 'Categories' },
    { id: 'text', name: 'Text' },
    { id: 'loveCount', name: 'Loves' }
  ];

  constructor(private quoteService: QuoteService) { }

  getHeaders() {
    return this.headerElements;
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
        id: quote._id,
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
