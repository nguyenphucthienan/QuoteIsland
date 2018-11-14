import { Component, Input, OnInit } from '@angular/core';

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

}
