import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesResolver } from './resolvers/categories.resolver';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  providers: [
    CategoriesResolver
  ]
})
export class CategoriesModule { }
