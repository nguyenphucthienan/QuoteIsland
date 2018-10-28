import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminAuthorManagerComponent } from './components/admin-author-manager/admin-author-manager.component';
import { AdminCategoryManagerComponent } from './components/admin-category-manager/admin-category-manager.component';
import { AdminQuoteManagerComponent } from './components/admin-quote-manager/admin-quote-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { AdminAuthorAddModalComponent } from './modals/admin-author-add-modal/admin-author-add-modal.component';
import { AdminCategoryAddModalComponent } from './modals/admin-category-add-modal/admin-category-add-modal.component';
import { AdminQuoteAddModalComponent } from './modals/admin-quote-add-modal/admin-quote-add-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminQuoteManagerComponent,
    AdminQuoteAddModalComponent,
    AdminAuthorManagerComponent,
    AdminAuthorAddModalComponent,
    AdminCategoryManagerComponent,
    AdminCategoryAddModalComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  entryComponents: [
    AdminAuthorAddModalComponent,
    AdminCategoryAddModalComponent
  ]
})
export class AdminModule { }
