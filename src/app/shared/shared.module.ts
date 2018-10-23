import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BannerComponent } from './components/banner/banner.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PanelComponent } from './components/panel/panel.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { SortModalComponent } from './components/sort-bar/sort-modal/sort-modal.component';

@NgModule({
  declarations: [
    BannerComponent,
    DatatableComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    SortModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    DatatableComponent
  ],
  entryComponents: [
    SortModalComponent
  ]
})
export class SharedModule { }
