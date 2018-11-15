import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortMode } from 'src/app/core/models/sort-mode.interface';

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

  select(sortMode: SortMode) {
    this.sortChanged.emit(sortMode);
  }

}
