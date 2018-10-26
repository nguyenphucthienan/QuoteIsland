import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/core/models/author.interface';

@Component({
  selector: 'app-author-info-modal',
  templateUrl: './author-info-modal.component.html',
  styleUrls: ['./author-info-modal.component.scss']
})
export class AuthorInfoModalComponent implements OnInit {

  @Input() author: Author;

  constructor() { }

  ngOnInit() {
  }

}
