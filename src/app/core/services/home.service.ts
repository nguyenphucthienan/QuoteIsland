import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Quote } from '../models/quote.interface';
import { QuoteService } from './quote.service';

@Injectable()
export class HomeService {

  private currentQuotesSubject = new BehaviorSubject<Quote[]>([]);
  private openMoodModalSubject = new BehaviorSubject<boolean>(false);

  currentQuotes$ = this.currentQuotesSubject.asObservable();
  openMoodModal$ = this.openMoodModalSubject.asObservable();

  constructor(private quoteService: QuoteService) { }

  readTokenFromStorage() {
    const home = JSON.parse(localStorage.getItem('home'));

    if (home) {
      this.getQuotes(home.categoryId);

      const date = new Date(home.date);
      date.setDate(date.getDate() + 1);

      if (date < new Date()) {
        this.openMoodModalSubject.next(true);
      }
    } else {
      this.getQuotes('5bd6b4d1b362ab251c59c3e4');
    }
  }

  private writeTokenToStorage(categoryId: string) {
    localStorage.setItem('home', JSON.stringify({
      date: new Date().getTime(),
      categoryId
    }));
  }

  private getQuotes(categoryId: string) {
    this.quoteService.getRandomQuotes(categoryId)
      .subscribe((quotes: Quote[]) => {
        this.currentQuotesSubject.next(quotes);
        this.writeTokenToStorage(categoryId);
      });
  }

  changeCategory(categoryId: string) {
    this.getQuotes(categoryId);
  }

}
