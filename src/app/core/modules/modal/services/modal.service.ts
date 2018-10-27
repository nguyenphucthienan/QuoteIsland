import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  NgModuleRef,
  Type,
} from '@angular/core';

import { ModalConfig } from '../helpers/modal-config';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalService {

  modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }

  public open(componentType: Type<any>, config: ModalConfig, moduleRef?: NgModuleRef<any>): ComponentRef<ModalComponent> {
    // Use moduleRef when open modal from a lazy-loading feature module
    const componentFactoryResolver = moduleRef
      ? moduleRef.componentFactoryResolver
      : this.componentFactoryResolver;

    const modalRef = this.appendModalComponentToBody(componentFactoryResolver);

    this.modalComponentRef.instance.childComponentType = componentType;
    this.attachModalConfig(config, moduleRef);

    return modalRef;
  }

  private appendModalComponentToBody(componentFactoryResolver: ComponentFactoryResolver): ComponentRef<ModalComponent> {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(this.injector);

    this.applicationRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.modalComponentRef = componentRef;
    this.modalComponentRef.instance.onClose.subscribe(() => {
      this.removeModalComponentFromBody();
    });

    return componentRef;
  }

  private removeModalComponentFromBody() {
    this.applicationRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }

  private attachModalConfig(config: ModalConfig, moduleRef: NgModuleRef<any>) {
    this.modalComponentRef.instance.config = config;
    this.modalComponentRef.instance.moduleRef = moduleRef;

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
