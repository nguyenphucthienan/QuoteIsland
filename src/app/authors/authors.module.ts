import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorInfoModalComponent } from './components/author-info-modal/author-info-modal.component';
import { AuthorsResolver } from './resolvers/authors.resolver';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorCardComponent,
    AuthorInfoModalComponent,
    AuthorDetailComponent
  ],
  imports: [
    SharedModule,
    AuthorsRoutingModule
  ],
  providers: [
    AuthorsResolver
  ],
  entryComponents: [
    AuthorInfoModalComponent
  ]
})
export class AuthorsModule { }
