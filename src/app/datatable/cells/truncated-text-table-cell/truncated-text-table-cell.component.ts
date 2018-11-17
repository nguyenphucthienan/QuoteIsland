import { Component, Input } from '@angular/core';
import { StringUtils } from 'src/app/utils/string-utils';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-truncated-text-table-cell',
  templateUrl: './truncated-text-table-cell.component.html',
  styleUrls: ['./truncated-text-table-cell.component.scss']
})
export class TruncatedTextTableCellComponent extends AbstractTableCellComponent {

  @Input() limit = 100;

  truncatedText: string;

  constructor() {
    super();
  }

  updateValue() {
    this.truncatedText = this.cell
      && StringUtils.truncate(this.cell.value, this.limit);
  }

}
