import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QuoteService } from 'src/app/core/services/quote.service';
import { TableService } from 'src/app/shared/components/datatable/services/table.service';

@Injectable()
export class AdminQuoteManagerTableService extends TableService {

  private readonly headElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'author', name: 'Author' },
    { id: 'categories', name: 'Categories' },
    { id: 'text', name: 'Text' },
    { id: 'loveCount', name: 'Loves' }
  ];

  constructor(private quoteService: QuoteService) {
    super();
  }

  getHeaders() {
    return this.headElements;
  }

  async getData() {
    return await this.quoteService.getQuotes(
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
    return items.map(quote => {
      return {
        id: quote._id,
        shortenedId: quote._id.substr(-4),
        author: quote.author && quote.author.fullName,
        categories: quote.categories && quote.categories
          .map(category => category.name)
          .join(', '),
        text: quote.text,
        loveCount: quote.loveCount
      };
    });
  }

}
