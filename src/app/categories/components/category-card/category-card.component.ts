import { Component, Input, NgModuleRef, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/modal/services/modal.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';

import { CategoryInfoModalComponent } from '../category-info-modal/category-info-modal.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit, OnDestroy {

  readonly infoModalTitle = 'Category Info';
  readonly quotePluralMapping = {
    '=0': '0 quote',
    'other': '# quotes'
  };

  @Input() headerClasss = 'blue-gradient';
  @Input() category: any;

  private photoHover = false;
  private tokenSubscription: Subscription;
  private currentUserId: string;

  isLoved: boolean;
  numOfLoves: number;

  constructor(private sanitizer: DomSanitizer,
    private moduleRef: NgModuleRef<any>,
    private modalService: ModalService,
    private authService: AuthService,
    private categoryService: CategoryService,
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
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.category.photoUrl})`);
    }

    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)),
        url(${this.category.photoUrl})`);
  }

  loveCategory() {
    if (!this.currentUserId) {
      this.alertService.error('You need to login to love this category');
      return;
    }

    if (this.isLoved) {
      this.numOfLoves -= 1;
    } else {
      this.numOfLoves += 1;
    }

    this.isLoved = !this.isLoved;

    this.categoryService.loveCategory(this.category._id)
      .subscribe(category => {
        this.category = category;
        this.updateValues();
      });
  }

  private updateValues() {
    this.isLoved = this.currentUserId && this.category.loves.includes(this.currentUserId);
    this.numOfLoves = this.category.loves.length;
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

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
