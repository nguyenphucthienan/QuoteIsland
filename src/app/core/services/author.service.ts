import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Author } from '../models/author.interface';

@Injectable()
export class AuthorService {

  private readonly authorUrl = `${environment.apiUrl}/authors`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getAuthors(pageNumber = 1, pageSize = 8,
    sortString = this.defaultSortString, filterString?: string): Observable<Author[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    if (filterString) {
      params = params.set('filter', filterString);
    }

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
