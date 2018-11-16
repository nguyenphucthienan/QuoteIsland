import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Quote } from 'src/app/core/models/quote.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable()
export class QuotesResolver implements Resolve<Quote[]> {

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  constructor(private quoteService: QuoteService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Quote[]> {
    return this.quoteService.getQuotes(this.defaultPagination)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
