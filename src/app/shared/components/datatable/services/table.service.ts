import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/core/models/pagination.interface';

@Injectable()
export abstract class TableService {

  protected defaultPageNumber = 1;
  protected defaultPageSize = 10;

  pagination: Pagination;
  elements: any[] = [];

  constructor() {
    this.pagination = {
      pageNumber: this.defaultPageNumber,
      pageSize: this.defaultPageSize,
      totalItems: this.defaultPageNumber * this.defaultPageSize
    };
  }

  public abstract getHeaders();

  public getData() {
    return this.elements;
  }

  protected abstract getRawData();

  public abstract async getDataRows();

}
