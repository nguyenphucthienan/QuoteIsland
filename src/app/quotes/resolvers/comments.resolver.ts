import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from 'src/app/core/models/comment.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Injectable()
export class CommentsResolver implements Resolve<Comment[]> {

  private readonly defaultPageNumber = 1;
  private readonly defaultPageSize = 5;

  constructor(private router: Router,
    private commentService: CommentService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
    const quoteId = route.paramMap.get('id');

    return this.commentService.getComments(quoteId,
      this.defaultPageNumber, this.defaultPageSize)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          this.router.navigate(['/quotes']);
          return of(null);
        })
      );
  }

}
