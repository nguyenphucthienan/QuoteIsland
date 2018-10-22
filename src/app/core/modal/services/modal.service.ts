import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

import { ModalConfig } from '../helpers/modal-config';
import { ModalInjector } from '../helpers/modal-injector';
import { ModalRef } from '../helpers/modal-ref';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }

  public open(componentType: Type<any>, config: ModalConfig) {
    const modalRef = this.appendModalComponentToBody();
    this.modalComponentRef.instance.childComponentType = componentType;
    this.attachModalConfig(config);
    return modalRef;
  }

  private appendModalComponentToBody() {
    // Create map config
    const map = new WeakMap();

    // Add the ModalRef to Dependency Injection
    const modalRef = new ModalRef();
    map.set(ModalRef, modalRef);

    // When somebody called the close method
    const subscription = modalRef.afterClosed.subscribe(() => {
      // Close the dialog
      this.removeModalComponentFromBody();
      subscription.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(new ModalInjector(this.injector, map));

    this.applicationRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.modalComponentRef = componentRef;
    this.modalComponentRef.instance.onClose.subscribe(() => {
      this.removeModalComponentFromBody();
    });

    return modalRef;
  }

  private removeModalComponentFromBody() {
    this.applicationRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }

  private attachModalConfig(config) {
    this.modalComponentRef.instance.config = config;
    const { inputs, outputs } = config;

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        this.modalComponentRef.instance[key] = inputs[key];
      }
    }

    for (const key in outputs) {
      if (outputs.hasOwnProperty(key)) {
        this.modalComponentRef.instance[key].subscribe(outputs[key]);
      }
    }
  }

}
