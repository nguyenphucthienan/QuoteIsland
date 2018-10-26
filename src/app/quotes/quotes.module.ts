import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { CommentsResolver } from './resolvers/comments.resolver';
import { QuoteResolver } from './resolvers/quote.resolver';
import { QuotesResolver } from './resolvers/quotes.resolver';

@NgModule({
  declarations: [
    QuotesComponent,
    QuoteDetailComponent,
    CommentSectionComponent,
    CommentItemComponent
  ],
  imports: [
    SharedModule,
    QuotesRoutingModule
  ],
  providers: [
    QuotesResolver,
    QuoteResolver,
    CommentsResolver
  ]
})
export class QuotesModule { }
