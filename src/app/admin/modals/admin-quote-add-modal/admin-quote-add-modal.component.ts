import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-quote-add-modal',
  templateUrl: './admin-quote-add-modal.component.html',
  styleUrls: ['./admin-quote-add-modal.component.scss']
})
export class AdminQuoteAddModalComponent implements OnInit {

  @ViewChild(ModalDirective) modal: ModalDirective;
  @Output() ok = new EventEmitter();

  addQuoteForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addQuoteForm = this.fb.group({
      author: ['', Validators.required],
      categories: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  reset() {
    this.addQuoteForm.reset();
  }

  addQuote() {
    this.ok.emit(this.addQuoteForm.value);
    this.modal.hide();
  }

}
