import { Component, Input, NgModuleRef, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/core/models/author.interface';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthorService } from 'src/app/core/services/author.service';

import { AuthorInfoModalComponent } from '../author-info-modal/author-info-modal.component';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit, OnDestroy {

  readonly quotePluralMapping = {
    '=0': '0 quote',
    'other': '# quotes'
  };

  @Input() headerClasss = 'blue-gradient';
  @Input() author: Author;

  private tokenSubscription: Subscription;
  private currentUserId: string;

  photoHover = false;
  isLoved: boolean;
  numOfLoves: number;

  constructor(private sanitizer: DomSanitizer,
    private moduleRef: NgModuleRef<any>,
    private modalService: ModalService,
    private authService: AuthService,
    private authorService: AuthorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.tokenSubscription = this.authService.decodedToken$
      .subscribe(token => {
        if (token) {
          this.currentUserId = token.id;
        }
      });

    this.updateValues();
  }

  getSanitizedImageUrl() {
    if (this.photoHover) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.author.photoUrl})`);
    }

    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)),
        url(${this.author.photoUrl})`);
  }

  loveAuthor() {
    if (!this.currentUserId) {
      this.alertService.error('You need to login to love this author');
      return;
    }

    if (this.isLoved) {
      this.numOfLoves -= 1;
    } else {
      this.numOfLoves += 1;
    }

    this.isLoved = !this.isLoved;

    this.authorService.loveAuthor(this.author._id)
      .subscribe((author: Author) => {
        this.author = author;
        this.updateValues();
      });
  }

  private updateValues() {
    this.isLoved = this.currentUserId && this.author.loves.includes(this.currentUserId);
    this.numOfLoves = this.author.loveCount || this.author.loves.length;
  }

  openInfoModal() {
    this.modalService.open(AuthorInfoModalComponent, {
      inputs: {
        title: this.author.fullName,
        hasBottomClose: true,
        closeOnBackdrop: true
      },
      childComponent: {
        inputs: {
          author: this.author
        }
      }
    }, this.moduleRef);
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
