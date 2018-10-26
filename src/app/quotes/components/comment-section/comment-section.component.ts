import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/core/models/comment.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { CommentService } from 'src/app/core/services/comment.service';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @ViewChild(PaginationComponent) paginationRef: PaginationComponent;
  @Input() quoteId: string;

  commentForm: FormGroup;
  comments: Comment[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.comments = data['comments'].items;
      this.pagination = data['comments'].pagination;
    });

    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  getComments() {
    this.commentService.getComments(this.quoteId,
      this.pagination.pageNumber,
      this.pagination.pageSize)
      .subscribe((response: any) => {
        this.comments = response.items;
        this.pagination = response.pagination;
      });
  }

  onPageChanged(pageNumber: number) {
    this.pagination.pageNumber = pageNumber;
    this.getComments();
  }

  postComment() {
    this.commentService.commentQuote(this.quoteId,
      this.commentForm.value.content)
      .subscribe((comment) => {
        this.commentForm.reset();

        let pageToNavigate;
        if (this.pagination.totalItems % this.pagination.pageSize === 0) {
          pageToNavigate = this.pagination.totalPages + 1;
        } else {
          pageToNavigate = this.pagination.totalPages;
        }

        this.paginationRef.select(pageToNavigate);
      });
  }

  onDeleteSuccess(comment: any) {
    let pageToNavigate;
    if (this.pagination.totalItems % this.pagination.pageSize === 1) {
      pageToNavigate = this.pagination.pageNumber - 1;
    } else {
      pageToNavigate = this.pagination.pageNumber;
    }

    this.paginationRef.select(pageToNavigate);
  }

}
