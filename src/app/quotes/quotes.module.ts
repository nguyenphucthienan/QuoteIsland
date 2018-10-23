import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { QuotesResolver } from './resolvers/quotes.resolver';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteCardComponent
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
