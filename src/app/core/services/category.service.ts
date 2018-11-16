import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { environment } from 'src/environments/environment';

import { Category } from '../models/category.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class CategoryService {

  private readonly categoryUrl = `${environment.apiUrl}/categories`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getCategories(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Category[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Category[]>(`${this.categoryUrl}`, { params: params });
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.categoryUrl}`, category);
  }

  editCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryUrl}/${id}`);
  }

  loveCategory(id: string): Observable<Category> {
    return this.http.post<Category>(`${this.categoryUrl}/${id}/love`, null);
  }

}
