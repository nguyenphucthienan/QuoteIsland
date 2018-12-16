import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  @Input() text: string;
  @Output() selected = new EventEmitter();

  truncatedText: string;

  constructor() { }

  ngOnInit() {
    this.truncatedText = StringUtils.truncate(this.text, 80);
  }

  select() {
    this.selected.emit();
  }

}
