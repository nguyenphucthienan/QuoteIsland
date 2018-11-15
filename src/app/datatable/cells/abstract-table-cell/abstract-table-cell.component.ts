import { Input, OnInit } from '@angular/core';

import { TableCell } from '../../models/table-cell.interface';
import { TableColumn } from '../../models/table-column.interface';
import { TableRow } from '../../models/table-row.interface';

export abstract class AbstractTableCellComponent implements OnInit {

  @Input() column?: TableColumn;
  @Input() row?: TableRow;
  @Input() cell: TableCell;

  constructor() { }

  ngOnInit() {
    this.updateValue();
  }

  abstract updateValue();

}
