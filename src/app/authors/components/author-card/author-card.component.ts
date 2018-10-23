import { Component, Input, NgModuleRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/core/modal/services/modal.service';

import { AuthorInfoModalComponent } from '../author-info-modal/author-info-modal.component';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  readonly infoModalTitle = 'Author Info';
  readonly quotePluralMapping = {
    '=0': '0 quote',
    'other': '# quotes'
  };

  @Input() headerClasss = 'blue-gradient';
  @Input() author: any;

  private photoHover = false;

  constructor(private sanitizer: DomSanitizer,
    private moduleRef: NgModuleRef<any>,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  getSanitizedImageUrl() {
    if (this.photoHover) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.author.photoUrl})`);
    }

    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.author.photoUrl})`);
  }

  openInfoModal() {
    this.modalService.open(AuthorInfoModalComponent, {
      inputs: {
        title: this.infoModalTitle,
        hasBottomClose: true,
        closeOnBackdrop: true
      },
    }, this.moduleRef);
  }

}
