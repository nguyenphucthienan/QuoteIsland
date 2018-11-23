import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-mood-select-modal',
  templateUrl: './mood-select-modal.component.html',
  styleUrls: ['./mood-select-modal.component.scss']
})
export class MoodSelectModalComponent implements OnInit {

  @Output() moodSelected = new EventEmitter();

  featuredCategories: any[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getFeaturedCategories();
  }

  private getFeaturedCategories() {
    this.categoryService.getFeaturedCategories()
      .subscribe((categories: any[]) => this.featuredCategories = categories);
  }

  selectMood(item: any) {
    this.moodSelected.emit(item);
  }

}
