import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalRef } from 'src/app/core/modal/helpers/modal-ref';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss']
})
export class SortModalComponent implements OnInit {

  // @Output() sortChanged = new EventEmitter();

  constructor(private modalRef: ModalRef) { }

  ngOnInit() {
  }

  show() {
  }

  hide() {
  }

  select(sortMode) {
    // this.sortChanged.emit(sortMode);
    this.modalRef.close(sortMode);
  }

}
