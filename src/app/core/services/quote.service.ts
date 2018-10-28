import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Quote } from '../models/quote.interface';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getQuotes(pageNumber = 1, pageSize = 8,
    sortString = this.defaultSortString): Observable<Quote[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get<Quote[]>(`${this.quoteUrl}`, { params: params });
  }

  getQuote(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.quoteUrl}/${id}`);
  }

  createQuote(rawQuote: any): Observable<Quote> {
    const quote = {
      author: rawQuote.author,
      categories: [rawQuote.categories],
      text: rawQuote.text,
      photoUrl: rawQuote.photoUrl
    };

    return this.http.post<Quote>(`${this.quoteUrl}`, quote);
  }

  getQuotesByAuthor(authorId: string,
    pageNumber = 1, pageSize = 8,
    sortString = this.defaultSortString): Observable<Quote[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', `author:${authorId}`)
      .set('sort', sortString);

    return this.http.get<Quote[]>(`${this.quoteUrl}`, { params: params });
  }

  getQuotesByCategory(categoryId: string,
    pageNumber = 1, pageSize = 8,
    sortString = this.defaultSortString): Observable<Quote[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', `categories:${categoryId}`)
      .set('sort', sortString);

    return this.http.get<Quote[]>(`${this.quoteUrl}`, { params: params });
  }

  loveQuote(id: string): Observable<Quote> {
    return this.http.post<Quote>(`${this.quoteUrl}/${id}/love`, null);
  }

}
