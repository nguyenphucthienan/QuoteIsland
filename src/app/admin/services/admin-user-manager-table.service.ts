import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filter-mode.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { UserService } from 'src/app/core/services/user.service';
import { TableAction, TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCell } from 'src/app/datatable/models/table-cell.interface';
import { TableColumn } from 'src/app/datatable/models/table-column.interface';
import { TableRow } from 'src/app/datatable/models/table-row.interface';
import { TableService } from 'src/app/datatable/services/table.service';

@Injectable()
export class AdminUserManagerTableService implements TableService {

  columns: TableColumn[] = [
    { name: '_id', text: 'ID', type: 'IdTableCellComponent', sortable: true },
    { name: 'username', text: 'Username', type: 'TextTableCellComponent', sortable: true },
    { name: 'firstName', text: 'First Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'lastName', text: 'Last Name', type: 'TextTableCellComponent', sortable: true },
    { name: 'roles', text: 'Roles', type: 'ArrayListTableCellComponent', sortable: true },
    { name: 'createdAt', text: 'Created', type: 'DateTableCellComponent', sortable: true },
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

  constructor(private userService: UserService) { }

  getDataColumns() {
    return this.columns;
  }

  getRawData() {
    return this.userService.getUsers(this.pagination,
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

            if (key === 'roles') {
              cells[key] = {
                value: row[key],
                textField: 'name'
              };
            } else {
              cells[key] = {
                value: row[key]
              };
            }
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
