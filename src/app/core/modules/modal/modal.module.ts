import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalHolderDirective } from './directives/modal-holder.directive';
import { ModalComponent } from './modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHolderDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ModalService
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ModalModule { }
