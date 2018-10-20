import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.http.get(`${this.quoteUrl}`);
  }

}
