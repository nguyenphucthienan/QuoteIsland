import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { TableColumn } from './models/table-column.interface';
import { TableRow } from './models/table-row.interface';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() tableService: TableService;
  @Input() selectableRow: boolean;

  @Output() cellChanged = new EventEmitter<any>();

  columns: TableColumn[] = [];
  rows: TableRow[] = [];

  constructor() { }

  async ngOnInit() {
    this.columns = this.tableService.getDataColumns();
    await this.getTableData();
  }

  private async getTableData() {
    this.rows = await this.tableService.getDataRows();
  }

  async refresh() {
    await this.getTableData();
  }

  onPageChanged(pageNumber: number) {
    this.tableService.pagination.pageNumber = pageNumber;
    this.getTableData();
  }

  onCellChanged(event: any) {
    this.cellChanged.emit(event);
  }

  selectRow(event: any, row: TableRow) {
    row.selected = event.target.checked;
  }

}
