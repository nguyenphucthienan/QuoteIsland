import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';

@NgModule({
  declarations: [
    QuotesComponent
  ],
  imports: [
    SharedModule,
    QuotesRoutingModule
  ],
  exports: [
    QuotesComponent
  ]
})
export class QuotesModule { }
