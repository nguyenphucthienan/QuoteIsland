import { Component, EventEmitter, OnInit, Output } from '@angular/core';

declare const $;

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
    $('#myModal').modal('show');

  }

  hide() {
    $('#myModal').modal('hide');
  }

  select(sortMode) {
    $('#myModal').modal('hide');
    $('#myModal').on('hidden.bs.modal', () => {
      this.sortChanged.emit(sortMode);
    });
  }

}
