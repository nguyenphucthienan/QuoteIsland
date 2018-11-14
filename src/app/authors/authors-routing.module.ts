import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorQuotesResolver } from './resolvers/author-quotes.resolver';
import { AuthorResolver } from './resolvers/author.resolver';
import { AuthorsResolver } from './resolvers/authors.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
    resolve: {
      authors: AuthorsResolver
    }
  },
  {
    path: ':id',
    component: AuthorDetailComponent,
    resolve: {
      author: AuthorResolver,
      quotes: AuthorQuotesResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthorsRoutingModule { }
