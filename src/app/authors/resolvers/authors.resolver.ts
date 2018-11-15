import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from 'src/app/core/models/author.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';

@Injectable()
export class AuthorsResolver implements Resolve<Author[]> {

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  constructor(private authorService: AuthorService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
    return this.authorService.getAuthors(this.defaultPagination)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
