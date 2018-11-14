import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-table-cell',
  templateUrl: './id-table-cell.component.html',
  styleUrls: ['./id-table-cell.component.scss']
})
export class IdTableCellComponent implements OnInit {

  @Input() cell: any;

  shortenedValue: string;

  constructor() { }

  ngOnInit() {
    this.shortenedValue = this.cell.substr(-4);
  }

}
