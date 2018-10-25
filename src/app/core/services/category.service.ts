import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {

  private readonly categoryUrl = `${environment.apiUrl}/categories`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getCategories(pageNumber = 1, pageSize = 8, sortString = this.defaultSortString) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get(`${this.categoryUrl}`, { params: params });
  }

  getCategory(categoryId: string) {
    return this.http.get(`${this.categoryUrl}/${categoryId}`);
  }

  loveCategory(id: number) {
    return this.http.post(`${this.categoryUrl}/${id}/love`, null);
  }
}
