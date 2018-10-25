import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() quoteId: string;
  @Input() comments: any = [];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  postComment(content: string) {
    this.commentService.commentQuote(this.quoteId, content)
      .subscribe((comment) => {
        if (this.comments) {
          this.comments.items.push(comment);
        } else {
          this.comments.items = [comment];
        }
      });
  }

}
