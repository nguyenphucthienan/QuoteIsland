import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryInfoModalComponent } from './components/category-info-modal/category-info-modal.component';
import { CategoriesResolver } from './resolvers/categories.resolver';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCardComponent,
    CategoryInfoModalComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  providers: [
    CategoriesResolver
  ],
  entryComponents: [
    CategoryInfoModalComponent
  ]
})
export class CategoriesModule { }
