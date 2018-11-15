import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ActionsTableCellComponent } from './cells/actions-table-cell/actions-table-cell.component';
import { DateTableCellComponent } from './cells/date-table-cell/date-table-cell.component';
import { IdTableCellComponent } from './cells/id-table-cell/id-table-cell.component';
import { TableCellComponent } from './cells/table-cell/table-cell.component';
import { TextTableCellComponent } from './cells/text-table-cell/text-table-cell.component';
import { DatatableComponent } from './datatable.component';

@NgModule({
  declarations: [
    DatatableComponent,
    TableCellComponent,
    IdTableCellComponent,
    TextTableCellComponent,
    ActionsTableCellComponent,
    DateTableCellComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DatatableComponent
  ]
})
export class DatatableModule { }
