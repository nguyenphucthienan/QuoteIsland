import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-category-edit-modal',
  templateUrl: './admin-category-edit-modal.component.html',
  styleUrls: ['./admin-category-edit-modal.component.scss']
})
export class AdminCategoryEditModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Output() categoryEdited = new EventEmitter();

  editForm: FormGroup;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [this.rowData.cells['name'].value, Validators.required],
      description: [this.rowData.cells['description'].value, Validators.required],
      photoUrl: [this.rowData.cells['photoUrl'].value, Validators.required]
    });
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editCategory() {
    this.categoryService.editCategory(
      this.rowData.cells['_id'].value,
      this.editForm.value)
      .subscribe(
        (category: Category) => {
          this.alertService.success('Edit category successfully');
          this.categoryEdited.emit(category);
        },
        error => this.alertService.error('Edit category failed')
      );
  }

}
