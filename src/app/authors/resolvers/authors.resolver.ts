import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from 'src/app/core/models/author.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';

@Injectable()
export class AuthorsResolver implements Resolve<Author[]> {

  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 8;

  constructor(private router: Router,
    private authorService: AuthorService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
    return this.authorService.getAuthors(this.defaultPageNumber, this.defaultPageSize)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}
