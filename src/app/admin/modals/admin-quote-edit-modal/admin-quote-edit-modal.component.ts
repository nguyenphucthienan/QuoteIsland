import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';
import { Author } from 'src/app/core/models/author.interface';
import { Category } from 'src/app/core/models/category.interface';
import { Pagination } from 'src/app/core/models/pagination.interface';
import { Quote } from 'src/app/core/models/quote.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-quote-edit-modal',
  templateUrl: './admin-quote-edit-modal.component.html',
  styleUrls: ['./admin-quote-edit-modal.component.scss']
})
export class AdminQuoteEditModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Output() quoteEdited = new EventEmitter();

  @ViewChild(NgSelectComponent) authorSelect: NgSelectComponent;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 9999
  };

  editForm: FormGroup;
  authors: Author[] = [];
  categories: Category[] = [];

  constructor(private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private quoteService: QuoteService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      author: [
        this.rowData.cells['author'].value._id,
        Validators.required
      ],
      categories: [
        this.rowData.cells['categories'].value.map(category => category._id),
        Validators.required
      ],
      text: [
        this.rowData.cells['text'].value,
        Validators.required
      ],
      photoUrl: [
        this.rowData.cells['photoUrl'] && this.rowData.cells['photoUrl'].value,
        Validators.required
      ]
    });

    forkJoin(
      this.authorService.getAuthors(this.defaultPagination),
      this.categoryService.getCategories(this.defaultPagination)
    ).
      subscribe((data: any) => {
        this.authors = data[0].items;
        this.categories = data[1].items;
      });
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editQuote() {
    this.quoteService.editQuote(
      this.rowData.cells['_id'].value,
      this.editForm.value)
      .subscribe(
        (quote: Quote) => {
          this.alertService.success('Edit quote successfully');
          this.quoteEdited.emit(quote);
        },
        error => this.alertService.error('Edit quote failed')
      );
  }

}
