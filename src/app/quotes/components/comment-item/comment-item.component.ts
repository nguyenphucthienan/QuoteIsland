import { Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.interface';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ConfirmModalComponent } from 'src/app/shared/modals/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.defaultUserPhotoUrl;

  @Input() comment: Comment;
  @Output() deleteSuccess = new EventEmitter();

  private tokenSubscription: Subscription;
  private currentUserId: string;
  private modalComponentRef: ComponentRef<ModalComponent>;

  canDelele: boolean;

  constructor(private authService: AuthService,
    private commentService: CommentService,
    private modalService: ModalService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.tokenSubscription = this.authService.decodedToken$
      .subscribe(token => {
        if (token) {
          this.currentUserId = token.id;
          this.updateValue();
        }
      });
  }

  deleteComment() {
    this.modalComponentRef = this.modalService.open(ConfirmModalComponent, {
      inputs: {
        title: 'Confirm'
      },
      childComponent: {
        inputs: {
          content: 'Are you sure you want to delete this commment?'
        },
        outputs: {
          ok: this.confirmDeleteComment.bind(this),
          cancel: this.cancelDeleteComment.bind(this)
        }
      }
    });
  }

  confirmDeleteComment() {
    this.commentService.deleteComment(this.comment.quote, this.comment._id)
      .subscribe(
        () => {
          this.modalComponentRef.instance.close();
          this.alertService.success('Delete comment successfully');
          this.deleteSuccess.emit(this.comment);
        },
        error => {
          this.modalComponentRef.instance.close();
          this.alertService.error('Delete comment failed');
        }
      );
  }

  cancelDeleteComment() {
    this.modalComponentRef.instance.close();
  }

  private updateValue() {
    if (this.currentUserId) {
      this.canDelele = this.comment.user._id === this.currentUserId;
    }
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
