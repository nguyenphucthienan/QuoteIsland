import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Comment } from '../models/comment.interface';

@Injectable()
export class CommentService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;
  private readonly defaultSortString = '+createdAt';

  constructor(private http: HttpClient) { }

  getComments(quoteId: string,
    pageNumber = 1, pageSize = 5,
    sortString = this.defaultSortString): Observable<Comment[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get<Comment[]>(`${this.quoteUrl}/${quoteId}/comments`, { params });
  }

  commentQuote(quoteId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.quoteUrl}/${quoteId}/comments`, { content });
  }

  deleteComment(quoteId: string, commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.quoteUrl}/${quoteId}/comments/${commentId}`);
  }

}
