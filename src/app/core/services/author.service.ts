import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorService {

  private readonly authorUrl = `${environment.apiUrl}/authors`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getAuthors(pageNumber = 1, pageSize = 10, sortString = this.defaultSortString) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get(`${this.authorUrl}`, { params: params });
  }

  getAuthor(authorId: string) {
    return this.http.get(`${this.authorUrl}/${authorId}`);
  }

}
