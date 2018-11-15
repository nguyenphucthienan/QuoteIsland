import { Component, Input, OnInit } from '@angular/core';

import { TableCell } from '../../models/table-cell.interface';
import { TableColumn } from '../../models/table-column.interface';
import { TableRow } from '../../models/table-row.interface';

@Component({
  selector: 'app-abstract-table-cell',
  templateUrl: './abstract-table-cell.component.html',
  styleUrls: ['./abstract-table-cell.component.scss']
})
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
