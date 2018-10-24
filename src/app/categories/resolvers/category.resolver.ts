import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable()
export class CategoryResolver implements Resolve<any[]> {

  constructor(private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const categoryId = route.paramMap.get('id');

    return this.categoryService.getCategory(categoryId)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/categories']);
          return of(null);
        })
      );
  }

}
