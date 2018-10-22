import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss']
})
export class SortModalComponent implements OnInit {

  @Output() sortChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  show() {
  }

  hide() {
  }

  select(sortMode) {
    this.sortChanged.emit(sortMode);
  }

}
