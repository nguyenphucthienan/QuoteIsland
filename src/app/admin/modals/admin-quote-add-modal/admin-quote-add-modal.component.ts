import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Author } from 'src/app/core/models/author.interface';
import { Category } from 'src/app/core/models/category.interface';
import { Quote } from 'src/app/core/models/quote.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthorService } from 'src/app/core/services/author.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Component({
  selector: 'app-admin-quote-add-modal',
  templateUrl: './admin-quote-add-modal.component.html',
  styleUrls: ['./admin-quote-add-modal.component.scss']
})
export class AdminQuoteAddModalComponent implements OnInit {

  @Output() quoteAdded = new EventEmitter();

  addForm: FormGroup;
  authors: Author[] = [];
  categories: Category[] = [];

  constructor(private fb: FormBuilder,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private quoteService: QuoteService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      author: [null, Validators.required],
      categories: [[], Validators.required],
      text: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });

    forkJoin(
      this.authorService.getAuthors(1, 9999),
      this.categoryService.getCategories(1, 9999)
    ).
      subscribe((data: any) => {
        this.authors = data[0].items;
        this.categories = data[1].items;
      });
  }

  addQuote() {
    this.quoteService.createQuote(this.addForm.value)
      .subscribe(
        (quote: Quote) => {
          this.alertService.success('Add quote successfully');
          this.quoteAdded.emit(quote);
        },
        error => this.alertService.error('Add quote failed')
      );
  }

}
