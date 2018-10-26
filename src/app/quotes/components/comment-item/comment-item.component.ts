import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.defaultUserPhotoUrl;

  @Input() comment: any;

  private tokenSubscription: Subscription;
  private currentUserId: string;

  canDelele: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.tokenSubscription = this.authService.decodedToken$
      .subscribe(token => {
        if (token) {
          this.currentUserId = token.id;
          this.updateValue();
        }
      });
  }

  updateValue() {
    if (this.currentUserId) {
      this.canDelele = this.comment.user._id === this.currentUserId;
    }
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
