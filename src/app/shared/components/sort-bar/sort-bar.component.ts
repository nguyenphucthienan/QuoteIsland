import { Component, ComponentRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalHolderDirective } from 'src/app/core/modal/directives/modal-holder.directive';
import { ModalService } from 'src/app/core/modal/services/modal.service';

import { SortModalComponent } from './sort-modal/sort-modal.component';
import { ModalComponent } from 'src/app/core/modal/modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  private readonly modalTitle = 'Sort Quotes';

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;
  @Output() sortChanged = new EventEmitter();

  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openSortModal() {
    this.modalComponentRef = this.modalService.open(SortModalComponent, {
      inputs: {
        title: this.modalTitle,
        hasBottomClose: true,
        closeOnBackdrop: true
      },
      childComponent: {
        outputs: {
          sortChanged: this.onSortChanged.bind(this)
        }
      }
    });
  }

  onSortChanged(sortMode) {
    this.sortChanged.emit(sortMode);
    this.modalComponentRef.instance.close();
  }

}
