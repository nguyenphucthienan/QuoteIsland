import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss']
})
export class SortModalComponent implements OnInit {

  @Input() sortOptions: any[];
  @Output() sortChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  select(sortMode) {
    this.sortChanged.emit(sortMode);
  }

}
