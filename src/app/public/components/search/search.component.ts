import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.searchPage;

  constructor() { }

  ngOnInit() {
  }

}
