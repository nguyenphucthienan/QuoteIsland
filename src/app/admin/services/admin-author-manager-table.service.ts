import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableService } from 'src/app/shared/components/datatable/services/table.service';

@Injectable()
export class AdminAuthorManagerTableService extends TableService {

  private readonly headerElements: any = [
    { id: '_id', name: 'ID', type: 'IdTableCellComponent' },
    { id: 'fullName', name: 'Full Name', type: 'TextCellComponent' },
    { id: 'born', name: 'Born', type: 'TextCellComponent' },
    { id: 'died', name: 'Died', type: 'TextCellComponent' },
    { id: 'nationality', name: 'Nationality', type: 'TextCellComponent' },
    { id: 'description', name: 'Description', type: 'TextCellComponent' },
    { id: 'quoteCount', name: 'Quotes', type: 'TextCellComponent' },
    { id: 'loveCount', name: 'Loves', type: 'TextCellComponent' }
  ];

  constructor(private authorService: AuthorService) {
    super();
  }

  getHeaders() {
    return this.headerElements;
  }

  getRawData() {
    return this.authorService.getAuthors(
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
    return this.elements.map(author => {
      // return {
      //   id: author._id,
      //   shortenedId: author._id.substr(-4),
      //   fullName: author.fullName,
      //   born: StringHelpers.toDateString(author.born),
      //   died: StringHelpers.toDateString(author.died),
      //   nationality: author.nationality,
      //   description: StringHelpers.truncate(author.description, 100),
      //   quoteCount: author.quoteCount,
      //   loveCount: author.loveCount
      // };

      return author;
    });
  }

}
