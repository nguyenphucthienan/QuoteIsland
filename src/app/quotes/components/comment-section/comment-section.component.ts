import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() quoteId: string;

  comments: any;
  pagination: Pagination;

  constructor(private route: ActivatedRoute,
    private commentService: CommentService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.comments = data['comments'].items;
      this.pagination = data['comments'].pagination;
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

  postComment(content: string) {
    this.commentService.commentQuote(this.quoteId, content)
      .subscribe((comment: any) => {
        comment.isNew = true;

        if (this.comments) {
          this.comments = this.comments.slice(0, 4);
          this.comments.unshift(comment);
        } else {
          this.comments = [comment];
        }
      });
  }

}
