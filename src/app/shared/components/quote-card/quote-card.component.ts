import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {

  @Input() text: string;
  @Input() author: string;

  constructor() { }

  ngOnInit() {
  }

}
