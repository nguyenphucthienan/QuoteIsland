import { Component, Input, OnInit } from '@angular/core';

import { TableService } from './services/table.service';
import { TableHeader } from './models/table-header.interface';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  @Input() tableService: TableService;

  headers: TableHeader[] = [];
  elements: any[] = [];

  constructor() { }

  async ngOnInit() {
    this.headers = this.tableService.getHeaders();
    await this.getTableData();
  }

  private async getTableData() {
    this.elements = await this.tableService.getDataRows();
  }

  async refresh() {
    await this.getTableData();
  }

  onPageChanged(pageNumber: number) {
    this.tableService.pagination.pageNumber = pageNumber;
    this.getTableData();
  }

}
