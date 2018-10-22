import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ModalHolderDirective } from '../../directives/modal-holder.directive';
import { SortModalComponent } from './sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss']
})
export class SortBarComponent implements OnInit {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;
  @Output() sortChanged = new EventEmitter();

  componentRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  showSortModal() {
    const viewContainerRef = this.modalHolder.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SortModalComponent);
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.show();
    this.componentRef.instance.sortChanged.subscribe(value => {
      this.sortChanged.emit(value);
      this.componentRef.destroy();
      viewContainerRef.clear();
    });
  }

}
