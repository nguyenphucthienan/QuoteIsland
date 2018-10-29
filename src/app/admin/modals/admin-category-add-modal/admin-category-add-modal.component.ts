import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-admin-category-add-modal',
  templateUrl: './admin-category-add-modal.component.html',
  styleUrls: ['./admin-category-add-modal.component.scss']
})
export class AdminCategoryAddModalComponent implements OnInit {

  @Output() categoryAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addCategory() {
    this.categoryService.createCategory(this.addForm.value)
      .subscribe(
        (category: Category) => {
          this.alertService.success('Add category successfully');
          this.categoryAdded.emit(category);
        },
        error => this.alertService.error('Add category failed')
      );
  }

}
