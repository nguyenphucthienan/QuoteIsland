import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TableColumn } from './models/table-column.interface';
import { TableRow } from './models/table-row.interface';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';
import { TableService } from './services/table.service';
import { SortMode } from '../core/models/sort-mode.interface';
import { TableUtils } from '../utils/table-utils';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers: [TableRowSelectTrackingService]
})
export class DatatableComponent implements OnInit {

  @Input() tableService: TableService;
  @Input() selectableRow: boolean;

  @Output() cellChanged = new EventEmitter<any>();

  columns: TableColumn[] = [];
  rows: TableRow[] = [];
  selectAllOnPage: boolean;

  constructor(private tableRowSelectTrackingService: TableRowSelectTrackingService) { }

  async ngOnInit() {
    this.columns = this.tableService.getDataColumns();
    await this.getTableData();
  }

  private async getTableData() {
    this.rows = await this.tableService.getDataRows();
    this.recheckSelectRows(this.rows);
    this.checkSelectAllOnPage();
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

  selectAllHeader(checked: boolean) {
    this.selectAllOnPage = checked;
    this.rows.forEach(row => {
      row.selected = checked;
      this.tableRowSelectTrackingService.setStateId(row.cells['_id'].value, row.selected);
    });
  }

  selectRow(checked: boolean, row: TableRow) {
    row.selected = checked;
    this.tableRowSelectTrackingService.setStateId(row.cells['_id'].value, row.selected);
    this.checkSelectAllOnPage();
  }

  private recheckSelectRows(rows: TableRow[]) {
    rows.forEach(row =>
      row.selected = this.tableRowSelectTrackingService.getStateId(row.cells['_id'].value)
    );
  }

  private checkSelectAllOnPage() {
    this.selectAllOnPage = this.rows
      .every(row => this.tableRowSelectTrackingService.getStateId(row.cells['_id'].value));
  }

  getHeaderIconClass(column: TableColumn) {
    const sortMode: SortMode = this.tableService.sortMode;
    return TableUtils.getHeaderIconClass(sortMode, column);
  }

  changeSortMode(column: TableColumn) {
    if (!column.sortable) {
      return;
    }

    const sortMode: SortMode = this.tableService.sortMode;

    if (sortMode.sortBy === column.name) {
      sortMode.isSortAscending = !sortMode.isSortAscending;
    } else {
      sortMode.sortBy = column.name;
      sortMode.isSortAscending = true;
    }

    this.getTableData();
  }

}
