import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {

  @Input() header: string;
  @Input() title: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
