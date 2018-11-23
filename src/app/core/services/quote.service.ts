import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { environment } from 'src/environments/environment';

import { FilterMode } from '../models/filter-mode.interface';
import { Pagination } from '../models/pagination.interface';
import { Quote } from '../models/quote.interface';
import { SortMode } from '../models/sort-mode.interface';

@Injectable()
export class QuoteService {

  private readonly quoteUrl = `${environment.apiUrl}/quotes`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false
  };

  constructor(private http: HttpClient) { }

  getQuotes(pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode): Observable<Quote[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Quote[]>(`${this.quoteUrl}`, { params: params });
  }

  getRandomQuotes(categoryId: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.quoteUrl}/random/categories/${categoryId}`);
  }

  getQuote(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.quoteUrl}/${id}`);
  }

  createQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.quoteUrl}`, quote);
  }

  editQuote(id: string, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.quoteUrl}/${id}`, quote);
  }

  deleteQuote(id: string): Observable<Quote> {
    return this.http.delete<Quote>(`${this.quoteUrl}/${id}`);
  }

  loveQuote(id: string): Observable<Quote> {
    return this.http.post<Quote>(`${this.quoteUrl}/${id}/love`, null);
  }

}
