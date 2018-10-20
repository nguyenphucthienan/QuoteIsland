import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable()
export class QuotesResolver implements Resolve<any[]> {

  private readonly DEFAULT_PAGE = 1;
  private readonly DEFAULT_OFFSET = 8;

  constructor(private router: Router,
    private quoteService: QuoteService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    return this.quoteService.getQuotes(this.DEFAULT_PAGE, this.DEFAULT_OFFSET)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}
