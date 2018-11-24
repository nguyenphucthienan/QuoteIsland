import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminAuthorManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'ID', type: 'IdTableCellComponent', sortable: true, center: true },
    { name: 'fullName', text: 'Full Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'born', text: 'Born', type: 'DateTableCellComponent', sortable: true },
    { name: 'died', text: 'Died', type: 'DateTableCellComponent', sortable: true },
    { name: 'nationality', text: 'Nationality', type: 'TextTableCellComponent', sortable: true },
    { name: 'description', text: 'Description', type: 'TruncatedTextTableCellComponent', sortable: true },
    { name: 'quoteCount', text: 'Quotes', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'loveCount', text: 'Loves', type: 'TextTableCellComponent', sortable: true, center: true },
    { name: 'actions', text: 'Actions', type: 'ActionsTableCellComponent', sortable: false }
  ];

  rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true
  };

  filterMode: FilterMode = {};

  actions: TableAction[] = [
    { class: 'btn-primary', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
    { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  ];

  constructor(private authorService: AuthorService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.authorService.getAuthors(this.pagination,
      this.sortMode, this.filterMode)
      .pipe(
        map((response: any) => {
          this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }

  async getDataRows() {
    return await this.getRawData()
      .then(data => {
        this.rows = data.map(row => {
          const cells: TableCell = <any>{};

          for (const key in row) {
            if (!row.hasOwnProperty(key)) {
              continue;
            }

            cells[key] = {
              value: row[key]
            };
          }

          cells['actions'] = {
            value: this.actions,
            showText: false
          };

          return { cells };
        });

        return this.rows;
      });
  }

}
