import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.interface';

@Component({
  selector: 'app-category-info-modal',
  templateUrl: './category-info-modal.component.html',
  styleUrls: ['./category-info-modal.component.scss']
})
export class CategoryInfoModalComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
