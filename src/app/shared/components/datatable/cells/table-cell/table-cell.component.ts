import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {

  @Input() cellType: any;
  @Input() cell: any;

  constructor() { }

  ngOnInit() {
  }

}
