import { Component, Input, NgModuleRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/core/modal/services/modal.service';

import { CategoryInfoModalComponent } from '../category-info-modal/category-info-modal.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {

  readonly infoModalTitle = 'Category Info';
  readonly quotePluralMapping = {
    '=0': '0 quote',
    'other': '# quotes'
  };

  @Input() headerClasss = 'blue-gradient';
  @Input() category: any;

  private photoHover = false;

  constructor(private sanitizer: DomSanitizer,
    private moduleRef: NgModuleRef<any>,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  getSanitizedImageUrl() {
    if (this.photoHover) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.category.photoUrl})`);
    }

    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)),
        url(${this.category.photoUrl})`);
  }

  openInfoModal() {
    this.modalService.open(CategoryInfoModalComponent, {
      inputs: {
        title: this.infoModalTitle,
        hasBottomClose: true,
        closeOnBackdrop: true
      },
      childComponent: {
        inputs: {
          category: this.category
        }
      }
    }, this.moduleRef);
  }

}
