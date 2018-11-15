import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 8
  };

  constructor(private categoryService: CategoryService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
    return this.categoryService.getCategories(this.defaultPagination)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
