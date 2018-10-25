import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable()
export class QuoteResolver implements Resolve<any[]> {

  constructor(private router: Router,
    private quoteService: QuoteService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const quoteId = route.paramMap.get('id');

    return this.quoteService.getQuote(quoteId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/quotes']);
          return of(null);
        })
      );
  }

}
