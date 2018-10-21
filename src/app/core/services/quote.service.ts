import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;
  private readonly defaultSortMode = '_createdAt';

  constructor(private http: HttpClient) { }

  getQuotes(pageNumber = 1, pageSize = 10, sortMode = this.defaultSortMode) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortMode', sortMode);

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

}
