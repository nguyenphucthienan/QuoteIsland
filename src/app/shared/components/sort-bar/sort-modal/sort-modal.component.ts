import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss']
})
export class SortModalComponent implements OnInit {

  @ViewChild(ModalDirective) sortModal: ModalDirective;
  @Output() sortChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.sortModal.show();
  }

  hide() {
    this.sortModal.hide();
  }

  select(sortMode = 'text') {
    this.sortChanged.emit(sortMode);
    this.hide();
  }

}
