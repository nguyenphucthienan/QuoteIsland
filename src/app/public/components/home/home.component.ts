import { Component, ComponentRef, NgModuleRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';

import { MoodSelectModalComponent } from '../../modals/mood-select-modal/mood-select-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly backgroundImages: any = [
    'https://images.pexels.com/photos/1170572/pexels-photo-1170572.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1492239/pexels-photo-1492239.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/450301/pexels-photo-450301.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1436129/pexels-photo-1436129.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1053775/pexels-photo-1053775.jpeg?auto=compress&cs=tinysrgb'
  ];

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private sanitizer: DomSanitizer,
    private modalService: ModalService,
    private moduleRef: NgModuleRef<any>) { }

  ngOnInit() {
    setTimeout(() => this.openMoodModal(), 0);
  }

  getBackgroundImage(index: number) {
    return this.sanitizer
      .bypassSecurityTrustStyle(`url(${this.backgroundImages[index]})`);
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

  onMoodSelected() {
    this.modalComponentRef.instance.close();
  }

}
