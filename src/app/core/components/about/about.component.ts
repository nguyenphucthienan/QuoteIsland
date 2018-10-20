import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.aboutPage;

  constructor() { }

  ngOnInit() {
  }

}
