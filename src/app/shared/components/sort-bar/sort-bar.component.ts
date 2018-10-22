import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalHolderDirective } from 'src/app/core/modal/directives/modal-holder.directive';
import { ModalRef } from 'src/app/core/modal/helpers/modal-ref';
import { ModalService } from 'src/app/core/modal/services/modal.service';

import { SortModalComponent } from './sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;
  @Output() sortChanged = new EventEmitter();

  constructor(private modalService: ModalService,
    private modalRef: ModalRef) { }

  ngOnInit() {
  }

  openSortModal() {
    this.modalService.open(SortModalComponent, {
      inputs: {
        title: 'Sort Quotes'
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
    this.modalRef.close();
  }

}
