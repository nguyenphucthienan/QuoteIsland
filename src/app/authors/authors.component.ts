import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.authorsPage;

  constructor() { }

  ngOnInit() {
  }

}
