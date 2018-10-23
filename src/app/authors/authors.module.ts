import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorsResolver } from './resolvers/authors.resolver';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorCardComponent
  ],
  imports: [
    SharedModule,
    AuthorsRoutingModule
  ],
  providers: [
    AuthorsResolver
  ]
})
export class AuthorsModule { }
