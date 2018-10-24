import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoriesResolver } from './resolvers/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: { categories: CategoriesResolver}
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
export class CategoriesRoutingModule { }
