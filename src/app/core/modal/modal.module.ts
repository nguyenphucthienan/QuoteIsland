import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalConfig } from './modal-config';
import { ModalHolderDirective } from './modal-holder.directive';
import { ModalRef } from './modal-ref';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHolderDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ModalService,
    ModalRef,
    ModalConfig,
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ModalModule { }
