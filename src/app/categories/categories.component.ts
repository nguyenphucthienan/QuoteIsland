import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.categoriesPage;

  constructor() { }

  ngOnInit() {
  }

}
