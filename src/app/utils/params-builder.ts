import { HttpParams } from '@angular/common/http';

import { FilterMode } from '../core/models/filter-mode.interface';
import { Pagination } from '../core/models/pagination.interface';
import { SortMode } from '../core/models/sort-mode.interface';

export class ParamsBuilder {

  private params: HttpParams;

  constructor() {
    this.params = new HttpParams();
  }

  applyPagination(pagination: Pagination) {
    this.params = this.params
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString());

    return this;
  }

  applySort(sortMode: SortMode) {
    let sortString: string;
    if (sortMode.isSortAscending) {
      sortString = `+${sortMode.sortBy}`;
    } else {
      sortString = `-${sortMode.sortBy}`;
    }

    this.params = this.params.set('sort', sortString);
    return this;
  }

  applyFilter(filterMode: FilterMode) {
    let filterString = '';
    for (const key in filterMode) {
      if (filterMode[key]) {
        filterString += `${key}:${filterMode[key]}`;
      }
    }

    this.params = this.params.set('filter', filterString);
    return this;
  }

  build() {
    return this.params;
  }

}
