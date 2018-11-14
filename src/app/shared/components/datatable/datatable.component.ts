import { Component, Input, OnInit } from '@angular/core';

import { TableService } from './services/table.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() tableService: TableService;

  headerElements: any[] = [];
  rowElements: any[] = [];

  constructor() { }

  async ngOnInit() {
    this.headerElements = this.tableService.getHeaders();
    await this.getTableData();
  }

  private async getTableData() {
    this.rowElements = await this.tableService.getDataRows();
  }

  async refresh() {
    await this.getTableData();
  }

  onPageChanged(pageNumber: number) {
    this.tableService.pagination.pageNumber = pageNumber;
    this.getTableData();
  }

}
