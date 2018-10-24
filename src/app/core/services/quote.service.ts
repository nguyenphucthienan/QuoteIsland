import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;
  private readonly defaultSortString = '-createdAt';

  constructor(private http: HttpClient) { }

  getQuotes(pageNumber = 1, pageSize = 10, sortString = this.defaultSortString) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sortString);

    return this.http.get(`${this.quoteUrl}`, { params: params });
  }

  createQuote(rawQuote) {
    const quote = {
      author: rawQuote.author,
      categories: [rawQuote.categories],
      text: rawQuote.text
    };

    return this.http.post(`${this.quoteUrl}`, quote);
  }

  getQuotesByAuthor(authorId: string, pageNumber = 1, pageSize = 10,
    sortString = this.defaultSortString) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('filter', `author:${authorId}`)
      .set('sort', sortString);

    return this.http.get(`${this.quoteUrl}`, { params: params });
  }

}
