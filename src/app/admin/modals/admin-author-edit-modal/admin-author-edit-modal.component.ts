import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Author } from 'src/app/core/models/author.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-author-edit-modal',
  templateUrl: './admin-author-edit-modal.component.html',
  styleUrls: ['./admin-author-edit-modal.component.scss']
})
export class AdminAuthorEditModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Output() authorEdited = new EventEmitter();

  editForm: FormGroup;

  myDatePickerOptions: INgxMyDpOptions = {
    dateFormat: 'mm/dd/yyyy'
  };

  constructor(private fb: FormBuilder,
    private authorService: AuthorService,
    private alertService: AlertService) { }

  ngOnInit() {
    const born = new Date(this.rowData.cells['born'].value);
    const died = new Date(this.rowData.cells['died'].value);

    this.editForm = this.fb.group({
      fullName: [this.rowData.cells['fullName'].value, Validators.required],
      nationality: [this.rowData.cells['nationality'].value, Validators.required],
      born: [{
        date: {
          year: born.getFullYear(),
          month: born.getMonth() + 1,
          day: born.getDate()
        }
      }, Validators.required],
      died: [{
        date: {
          year: died.getFullYear(),
          month: died.getMonth() + 1,
          day: died.getDate()
        }
      }, Validators.required],
      description: [this.rowData.cells['description'].value, Validators.required],
      photoUrl: [this.rowData.cells['photoUrl'].value, Validators.required]
    });

  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editAuthor() {
    const editFormValue = {
      ...this.editForm.value,
      born: this.editForm.value.born.formatted,
      died: this.editForm.value.died.formatted
    };

    this.authorService.editAuthor(
      this.rowData.cells['_id'].value,
      editFormValue)
      .subscribe(
        (author: Author) => {
          this.alertService.success('Edit author successfully');
          this.authorEdited.emit(author);
        },
        error => this.alertService.error('Edit author failed')
      );
  }

}
