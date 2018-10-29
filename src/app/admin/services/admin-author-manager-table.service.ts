import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StringHelpers } from 'src/app/core/helpers/string.helper';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableService } from 'src/app/shared/components/datatable/services/table.service';

@Injectable()
export class AdminAuthorManagerTableService extends TableService {

  private readonly headElements: any = [
    { id: 'shortenedId', name: 'ID' },
    { id: 'fullName', name: 'Full Name' },
    { id: 'born', name: 'Born' },
    { id: 'died', name: 'Died' },
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

  async getRawData() {
    return await this.authorService.getAuthors(
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

  async getTableData() {
    await this.getRawData();
    return this.elements.map(author => {
      return {
        id: author._id,
        shortenedId: author._id.substr(-4),
        fullName: author.fullName,
        born: author.born && new Date(author.born).toDateString(),
        died: author.died && new Date(author.died).toDateString(),
        nationality: author.nationality,
        description: StringHelpers.truncate(author.description, 100),
        quoteCount: author.quoteCount,
        loveCount: author.loveCount
      };
    });
  }

}
