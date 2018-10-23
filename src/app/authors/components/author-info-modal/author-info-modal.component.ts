import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-author-info-modal',
  templateUrl: './author-info-modal.component.html',
  styleUrls: ['./author-info-modal.component.scss']
})
export class AuthorInfoModalComponent implements OnInit {

  @Input() author: any;

  constructor() { }

  ngOnInit() {
  }

}
