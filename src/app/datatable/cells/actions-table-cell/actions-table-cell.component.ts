import { Component } from '@angular/core';

import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';
import { TableAction } from '../../models/table-action.interface';

@Component({
  selector: 'app-actions-table-cell',
  templateUrl: './actions-table-cell.component.html',
  styleUrls: ['./actions-table-cell.component.scss']
})
export class ActionsTableCellComponent extends AbstractTableCellComponent {

  actions: TableAction[];
  showText: boolean;

  constructor() {
    super();
  }

  updateValue() {
    this.actions = this.cell && this.cell.value;
    this.showText = this.cell && this.cell.showText;
  }

  onActionClicked(action: TableAction) {
    this.cellChanged.emit(action);
  }

}
