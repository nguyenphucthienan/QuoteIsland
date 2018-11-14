import { Pagination } from 'src/app/core/models/pagination.interface';
import { TableHeader } from '../models/table-header.interface';

export interface TableService {

  headers: TableHeader[];
  elements: any[];
  pagination: Pagination;

  getHeaders();

  getRawData();

  getDataRows();

}
