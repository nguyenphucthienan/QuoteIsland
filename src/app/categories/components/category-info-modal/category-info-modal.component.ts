import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-info-modal',
  templateUrl: './category-info-modal.component.html',
  styleUrls: ['./category-info-modal.component.scss']
})
export class CategoryInfoModalComponent implements OnInit {

  @Input() category: any;

  constructor() { }

  ngOnInit() {
  }

}
