import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-table-cell',
  templateUrl: './text-table-cell.component.html',
  styleUrls: ['./text-table-cell.component.scss']
})
export class TextTableCellComponent implements OnInit {

  @Input() cell: any;

  constructor() { }

  ngOnInit() {
  }

}
