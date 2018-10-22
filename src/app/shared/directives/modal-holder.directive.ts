import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalHolder]'
})
export class ModalHolderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
