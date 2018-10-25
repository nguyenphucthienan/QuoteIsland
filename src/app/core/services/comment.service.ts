import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;
  private readonly defaultSortString = '+createdAt';

  constructor(private http: HttpClient) { }

  getComments(quoteId: string, pageNumber = 1, pageSize = 5, sortString = this.defaultSortString) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get(`${this.quoteUrl}/${quoteId}/comments`, { params });
  }

  commentQuote(quoteId: string, content: string) {
    return this.http.post(`${this.quoteUrl}/${quoteId}/comments`, { content });
  }

}
