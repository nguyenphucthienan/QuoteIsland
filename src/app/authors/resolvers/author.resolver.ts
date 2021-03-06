import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from 'src/app/core/models/author.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';

@Injectable()
export class AuthorResolver implements Resolve<Author> {

  constructor(private router: Router,
    private authorService: AuthorService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Author> {
    const authorId = route.paramMap.get('id');

    return this.authorService.getAuthor(authorId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/authors']);
          return of(null);
        })
      );
  }

}
