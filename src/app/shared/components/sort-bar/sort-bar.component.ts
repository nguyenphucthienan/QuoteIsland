import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { SortModalComponent } from './sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  @ViewChild(SortModalComponent) sortModal: SortModalComponent;
  @Output() sortChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
