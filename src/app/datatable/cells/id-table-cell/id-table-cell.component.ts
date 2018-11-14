import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-table-cell',
  templateUrl: './id-table-cell.component.html',
  styleUrls: ['./id-table-cell.component.scss']
})
export class IdTableCellComponent implements OnInit {

  @Input() cell: any;

  id: string;

  constructor() { }

  ngOnInit() {
    this.id = this.cell.value.substr(-4);
  }

}
