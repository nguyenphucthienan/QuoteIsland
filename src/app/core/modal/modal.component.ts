import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ModalHolderDirective } from './modal-holder.directive';
import { ModalRef } from './modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;

  childComponentType: Type<any>;
  componentRef: ComponentRef<any>;

  private readonly onCloseSubject = new Subject<any>();
  public onClose = this.onCloseSubject.asObservable();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private modalRef: ModalRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(e: MouseEvent) {
    this.modalRef.close();
  }

  onModalClicked(e: MouseEvent) {
    e.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.modalHolder.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  close() {
    this.modalRef.close();
    this.onCloseSubject.next();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
