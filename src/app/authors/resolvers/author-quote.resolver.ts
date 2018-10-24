import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable()
export class AuthorQuotesResolver implements Resolve<any[]> {

  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 8;

  constructor(private router: Router,
    private quoteService: QuoteService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const authorId = route.paramMap.get('id');

    return this.quoteService.getQuotesByAuthor(authorId,
      this.defaultPageNumber, this.defaultPageSize)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/authors']);
          return of(null);
        })
      );
  }

}
