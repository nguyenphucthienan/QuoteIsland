import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Category } from '../models/category.interface';

@Injectable()
export class CategoryService {

  private readonly categoryUrl = `${environment.apiUrl}/categories`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getCategories(pageNumber = 1, pageSize = 8,
    sortString = this.defaultSortString): Observable<Category[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get<Category[]>(`${this.categoryUrl}`, { params: params });
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`);
  }

  loveCategory(id: string): Observable<Category> {
    return this.http.post<Category>(`${this.categoryUrl}/${id}/love`, null);
  }
}
