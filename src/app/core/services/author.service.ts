import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { environment } from 'src/environments/environment';

import { Author } from '../models/author.interface';
import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class AuthorService {

  private readonly authorUrl = `${environment.apiUrl}/authors`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getAuthors(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Author[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Author[]>(`${this.authorUrl}`, { params: params });
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.authorUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.authorUrl}`, author);
  }

  editAuthor(id: string, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.authorUrl}/${id}`, author);
  }

  deleteAuthor(id: string): Observable<Author> {
    return this.http.delete<Author>(`${this.authorUrl}/${id}`);
  }

  loveAuthor(id: string): Observable<Author> {
    return this.http.post<Author>(`${this.authorUrl}/${id}/love`, null);
  }

}
