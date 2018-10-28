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
    sortString = this.defaultSortString): Observable<Author[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get<Author[]>(`${this.authorUrl}`, { params: params });
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.authorUrl}/${id}`);
  }

  createAuthor(author): Observable<Author> {
    return this.http.post<Author>(`${this.authorUrl}`, author);
  }

  loveAuthor(id: string): Observable<Author> {
    return this.http.post<Author>(`${this.authorUrl}/${id}/love`, null);
  }

}
