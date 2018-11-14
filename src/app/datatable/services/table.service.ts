import { Pagination } from 'src/app/core/models/pagination.interface';

export interface TableService {

  elements: any[];
  pagination: Pagination;

  getHeaders();

  getRawData();

  getDataRows();

}
