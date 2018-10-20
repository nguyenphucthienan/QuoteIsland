import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;

  constructor(private http: HttpClient) { }

  getQuotes(page = 1, offset = 10) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('offset', offset.toString());

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
