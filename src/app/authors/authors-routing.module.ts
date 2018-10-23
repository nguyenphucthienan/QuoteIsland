import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { AuthorsResolver } from './resolvers/authors.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
    resolve: { authors: AuthorsResolver }
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
