import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SortMode } from 'src/app/core/models/sort-mode.interface';
import { SortOption } from 'src/app/core/models/sort-option.interface';
import { ModalHolderDirective } from 'src/app/core/modules/modal/directives/modal-holder.directive';
import { ModalComponent } from 'src/app/core/modules/modal/modal.component';
import { ModalService } from 'src/app/core/modules/modal/services/modal.service';

import { SortModalComponent } from '../../modals/sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;

  @Input() modalTitle: string;
  @Input() modalSortOptions: SortOption[];

  @Output() sortChanged = new EventEmitter();

  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  openSortModal() {
    this.modalComponentRef = this.modalService.open(SortModalComponent, {
      inputs: {
        title: this.modalTitle,
        hasBottomClose: true,
        closeOnBackdrop: true
      },
      childComponent: {
        inputs: {
          sortOptions: this.modalSortOptions
        },
        outputs: {
          sortChanged: this.onSortChanged.bind(this)
        }
      }
    });
  }

  onSortChanged(sortMode: SortMode) {
    this.sortChanged.emit(sortMode);
    this.modalComponentRef.instance.close();
  }

}
