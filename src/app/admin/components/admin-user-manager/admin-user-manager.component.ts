import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.scss']
})
export class AdminUserManagerComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.adminPage;

  constructor() { }

  ngOnInit() {
  }

}
