import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

import { ModalConfig } from '../modal/modal-config';
import { ModalInjector } from '../modal/modal-injector';
import { ModalRef } from '../modal/modal-ref';
import { ModalComponent } from '../modal/modal.component';

@Injectable()
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }

  appendModalComponentToBody(config: ModalConfig) {
    // Create map config
    const map = new WeakMap();
    map.set(ModalConfig, config);

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

  public open(componentType: Type<any>, config: ModalConfig) {
    const modalRef = this.appendModalComponentToBody(config);
    this.modalComponentRef.instance.childComponentType = componentType;
    return modalRef;
  }

}
