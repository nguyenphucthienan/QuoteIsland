import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BannerComponent } from './components/banner/banner.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [
    BannerComponent,
    DatatableComponent,
    PanelComponent
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
    DatatableComponent
  ]
})
export class SharedModule { }
