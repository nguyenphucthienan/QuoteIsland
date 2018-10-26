import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BannerComponent } from './components/banner/banner.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PanelComponent } from './components/panel/panel.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { SortModalComponent } from './components/sort-bar/sort-modal/sort-modal.component';

@NgModule({
  declarations: [
    BannerComponent,
    DatatableComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    SortModalComponent,
    QuoteCardComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot().ngModule,
    BannerComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    DatatableComponent,
    QuoteCardComponent
  ],
  entryComponents: [
    SortModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
