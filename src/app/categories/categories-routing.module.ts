import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { CategoryQuotesResolver } from './resolvers/category-quote.resolver';
import { CategoryResolver } from './resolvers/category.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver
    }
  },
  {
    path: ':id',
    component: CategoryDetailComponent,
    resolve: {
      category: CategoryResolver,
      quotes: CategoryQuotesResolver
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
export class CategoriesRoutingModule { }
