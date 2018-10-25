import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable()
export class CategoriesResolver implements Resolve<any[]> {

  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 8;

  constructor(private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    return this.categoryService.getCategories(this.defaultPageNumber, this.defaultPageSize)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/']);
          return of(null);
        })
      );
  }

}