import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { QuoteResolver } from './resolvers/quote.resolver';
import { QuotesResolver } from './resolvers/quotes.resolver';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteDetailComponent
  ],
  imports: [
    SharedModule,
    QuotesRoutingModule
  ],
  providers: [
    QuotesResolver,
    QuoteResolver
  ]
})
export class QuotesModule { }
