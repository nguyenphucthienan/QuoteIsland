import { Component, ComponentRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ModalService } from 'src/app/core/modal/services/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
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
  private modalComponentRef: ComponentRef<ModalComponent>;

  canDelele: boolean;

  constructor(private authService: AuthService,
    private modalService: ModalService) { }

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
    this.modalComponentRef.instance.close();
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
