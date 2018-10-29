import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/core/models/author.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-admin-author-add-modal',
  templateUrl: './admin-author-add-modal.component.html',
  styleUrls: ['./admin-author-add-modal.component.scss']
})
export class AdminAuthorAddModalComponent implements OnInit {

  @Output() authorAdded = new EventEmitter();

  addForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authorService: AuthorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      fullName: ['', Validators.required],
      nationality: ['', Validators.required],
      born: ['', Validators.required],
      died: ['', Validators.required],
      description: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addAuthor() {
    this.authorService.createAuthor(this.addForm.value)
      .subscribe(
        (author: Author) => {
          this.alertService.success('Add author successfully');
          this.authorAdded.emit(author);
        },
        error => this.alertService.error('Add author failed')
      );
  }

}
