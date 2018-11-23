import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mood-select-modal',
  templateUrl: './mood-select-modal.component.html',
  styleUrls: ['./mood-select-modal.component.scss']
})
export class MoodSelectModalComponent implements OnInit {

  @Output() moodSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
