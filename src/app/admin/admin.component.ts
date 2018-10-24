import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.adminPage;

  constructor() { }

  ngOnInit() {
  }

}
