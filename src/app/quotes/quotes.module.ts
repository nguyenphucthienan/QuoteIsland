import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { QuotesResolver } from './resolvers/quotes.resolver';

@NgModule({
  declarations: [
    QuotesComponent
  ],
  imports: [
    SharedModule,
    QuotesRoutingModule
  ],
  providers: [
    QuotesResolver
  ]
})
export class QuotesModule { }
