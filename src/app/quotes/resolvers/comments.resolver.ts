import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from 'src/app/core/models/comment.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Injectable()
export class CommentsResolver implements Resolve<Comment[]> {

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 5
  };

  constructor(private commentService: CommentService,
    private alertService: AlertService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
    const quoteId = route.paramMap.get('id');

    return this.commentService.getComments(quoteId, this.defaultPagination)
      .pipe(
        catchError(error => {
          this.alertService.error('Problem retrieving data');
          return of(null);
        })
      );
  }

}
