import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { IdTableCellComponent } from './cells/id-table-cell/id-table-cell.component';
import { TableCellComponent } from './cells/table-cell/table-cell.component';
import { TextTableCellComponent } from './cells/text-table-cell/text-table-cell.component';
import { DatatableComponent } from './datatable.component';

@NgModule({
  declarations: [
    DatatableComponent,
    TableCellComponent,
    IdTableCellComponent,
    TextTableCellComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatatableComponent
  ]
})
export class DatatableModule { }
