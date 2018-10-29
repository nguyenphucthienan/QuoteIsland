import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

import { BannerComponent } from './components/banner/banner.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PanelComponent } from './components/panel/panel.component';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { SortModalComponent } from './modals/sort-modal/sort-modal.component';

@NgModule({
  declarations: [
    FileSelectDirective,
    FileDropDirective,
    HasRoleDirective,
    BannerComponent,
    DatatableComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    SortModalComponent,
    QuoteCardComponent,
    ConfirmModalComponent,
    PhotoUploaderComponent
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
    NgSelectModule,
    HasRoleDirective,
    BannerComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    DatatableComponent,
    QuoteCardComponent,
    PhotoUploaderComponent
  ],
  entryComponents: [
    SortModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
