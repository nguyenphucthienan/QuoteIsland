import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalHolderDirective } from 'src/app/core/modal/directives/modal-holder.directive';
import { ModalService } from 'src/app/core/modal/services/modal.service';

import { SortModalComponent } from './sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;
  @Output() sortChanged = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openSortModal() {
    const modal = this.modalService.open(SortModalComponent, null);

    modal.afterClosed.subscribe(result => {
      console.log('Modal closed', result);
    });
  }

}
