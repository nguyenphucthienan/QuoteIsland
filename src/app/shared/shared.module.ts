import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MyDatePickerModule } from 'mydatepicker';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import { BannerComponent } from './components/banner/banner.component';
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
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule.forRoot().ngModule,
    MDBBootstrapModule.forRoot().ngModule,
    NgSelectModule,
    MyDatePickerModule,
    HasRoleDirective,
    BannerComponent,
    PanelComponent,
    PaginationComponent,
    SortBarComponent,
    QuoteCardComponent,
    PhotoUploaderComponent
  ],
  entryComponents: [
    SortModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
