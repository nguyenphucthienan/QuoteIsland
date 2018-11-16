import { Pagination } from 'src/app/core/models/pagination.interface';

import { TableColumn } from '../models/table-column.interface';
import { TableRow } from '../models/table-row.interface';
import { SortMode } from 'src/app/core/models/sort-mode.interface';

export interface TableService {

  columns: TableColumn[];
  rows: TableRow[];

  pagination: Pagination;
  sortMode: SortMode;

  getDataColumns();

  getRawData();

  getDataRows();

}
