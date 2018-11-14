import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableHeader } from 'src/app/datatable/models/table-header.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminAuthorManagerTableService implements TableService {

  headers: TableHeader[] = [
    { name: '_id', text: 'ID', type: 'IdTableCellComponent' },
    { name: 'fullName', text: 'Full Name', type: 'TextCellComponent' },
    { name: 'born', text: 'Born', type: 'TextCellComponent' },
    { name: 'died', text: 'Died', type: 'TextCellComponent' },
    { name: 'nationality', text: 'Nationality', type: 'TextCellComponent' },
    { name: 'description', text: 'Description', type: 'TextCellComponent' },
    { name: 'quoteCount', text: 'Quotes', type: 'TextCellComponent' },
    { name: 'loveCount', text: 'Loves', type: 'TextCellComponent' }
  ];

  elements: any[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  constructor(private authorService: AuthorService) { }

  getHeaders() {
    return this.headers;
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
      //  name: author._id,
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
