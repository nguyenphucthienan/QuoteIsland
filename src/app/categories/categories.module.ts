import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryInfoModalComponent } from './components/category-info-modal/category-info-modal.component';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { CategoryQuotesResolver } from './resolvers/category-quote.resolver';
import { CategoryResolver } from './resolvers/category.resolver';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCardComponent,
    CategoryInfoModalComponent,
    CategoryDetailComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  providers: [
    CategoriesResolver,
    CategoryResolver,
    CategoryQuotesResolver
  ],
  entryComponents: [
    CategoryInfoModalComponent
  ]
})
export class CategoriesModule { }
