import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { HomeService } from './core/services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private homeService: HomeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.homeService.readTokenFromStorage();
    this.authService.readTokenFromStorage();
  }

}
