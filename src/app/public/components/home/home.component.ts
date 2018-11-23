import { Component, ComponentRef, NgModuleRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Quote } from 'src/app/core/models/quote.interface';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';
import { HomeService } from 'src/app/core/services/home.service';

import { MoodSelectModalComponent } from '../../modals/mood-select-modal/mood-select-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private modalComponentRef: ComponentRef<ModalComponent>;

  quotes: Quote[];

  constructor(private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
    this.homeService.currentQuotes$
      .subscribe((quotes: Quote[]) => this.quotes = quotes);

    this.homeService.openMoodModal$
      .subscribe((flag: boolean) => {
        if (flag) {
          setTimeout(() => this.openMoodModal(), 0);
        }
      });
  }

  getBackgroundImage(quote: Quote) {
    return this.sanitizer
      .bypassSecurityTrustStyle(`url(${quote.photoUrl})`);
  }

  openMoodModal() {
    this.modalComponentRef = this.modalService.open(MoodSelectModalComponent, {
      inputs: {
        title: 'How do you feel today?',
        hasBottomClose: true,
        closeOnBackdrop: true
      },
      childComponent: {
        outputs: {
          moodSelected: this.onMoodSelected.bind(this)
        }
      }
    }, this.moduleRef);
  }

  onMoodSelected(item: any) {
    this.modalComponentRef.instance.close();
    this.homeService.changeCategory(item._id);
  }

}
