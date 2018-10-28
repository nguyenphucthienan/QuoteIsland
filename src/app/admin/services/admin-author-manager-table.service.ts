import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableService } from 'src/app/shared/components/datatable/services/table.service';

@Injectable()
export class AdminAuthorManagerTableService extends TableService {

  private readonly headElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'fullName', name: 'Full Name' },
    { id: 'nationality', name: 'Nationality' },
    { id: 'description', name: 'Description' },
    { id: 'quoteCount', name: 'Quotes' },
    { id: 'loveCount', name: 'Loves' }
  ];

  constructor(private authorService: AuthorService) {
    super();
  }

  getHeaders() {
    return this.headElements;
  }

  async getData() {
    return await this.authorService.getAuthors(
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
    return items.map(author => {
      return {
        id: author._id,
        shortenedId: author._id.substr(-4),
        fullName: author.fullName,
        nationality: author.nationality,
        description: author.description,
        quoteCount: author.quoteCount,
        loveCount: author.loveCount
      };
    });
  }
}
