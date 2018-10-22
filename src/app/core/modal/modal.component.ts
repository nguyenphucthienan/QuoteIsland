import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { ModalHolderDirective } from './directives/modal-holder.directive';
import { ModalConfig } from './helpers/modal-config';

declare const $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ModalHolderDirective) modalHolder: ModalHolderDirective;
  @Input() title: string;

  private readonly onCloseSubject = new Subject<any>();
  public onClose = this.onCloseSubject.asObservable();

  childComponentType: Type<any>;
  componentRef: ComponentRef<any>;
  config: ModalConfig;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadChildComponent();
    this.cd.detectChanges();
  }

  onOverlayClicked(e: MouseEvent) {
    this.close();
  }

  onModalClicked(e: MouseEvent) {
    e.stopPropagation();
  }

  private loadChildComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponentType);
    const viewContainerRef = this.modalHolder.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.attachChildComponentConfig();
  }

  private attachChildComponentConfig() {
    const { inputs, outputs } = this.config.childComponent;

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        this.componentRef.instance[key] = inputs[key];
      }
    }

    for (const key in outputs) {
      if (outputs.hasOwnProperty(key)) {
        this.componentRef.instance[key].subscribe(outputs[key]);
      }
    }
  }

  close() {
    $('.modal-container').addClass('animated fadeOut');
    $('.modal-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
      this.onCloseSubject.next();
    });
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
