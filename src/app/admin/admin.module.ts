import { NgModule } from '@angular/core';

import { DatatableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminAuthorManagerComponent } from './components/admin-author-manager/admin-author-manager.component';
import { AdminCategoryManagerComponent } from './components/admin-category-manager/admin-category-manager.component';
import { AdminQuoteManagerComponent } from './components/admin-quote-manager/admin-quote-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { AdminAuthorAddModalComponent } from './modals/admin-author-add-modal/admin-author-add-modal.component';
import { AdminAuthorEditModalComponent } from './modals/admin-author-edit-modal/admin-author-edit-modal.component';
import { AdminCategoryAddModalComponent } from './modals/admin-category-add-modal/admin-category-add-modal.component';
import { AdminCategoryEditModalComponent } from './modals/admin-category-edit-modal/admin-category-edit-modal.component';
import { AdminQuoteAddModalComponent } from './modals/admin-quote-add-modal/admin-quote-add-modal.component';
import { AdminQuoteEditModalComponent } from './modals/admin-quote-edit-modal/admin-quote-edit-modal.component';
import { AdminUserAddModalComponent } from './modals/admin-user-add-modal/admin-user-add-modal.component';
import { AdminUserEditModalComponent } from './modals/admin-user-edit-modal/admin-user-edit-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminUserAddModalComponent,
    AdminUserEditModalComponent,
    AdminAuthorManagerComponent,
    AdminAuthorAddModalComponent,
    AdminAuthorEditModalComponent,
    AdminCategoryManagerComponent,
    AdminCategoryAddModalComponent,
    AdminCategoryEditModalComponent,
    AdminQuoteManagerComponent,
    AdminQuoteAddModalComponent,
    AdminQuoteEditModalComponent,
    AdminUserAddModalComponent,
    AdminUserEditModalComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    DatatableModule
  ],
  entryComponents: [
    AdminUserAddModalComponent,
    AdminUserEditModalComponent,
    AdminAuthorAddModalComponent,
    AdminAuthorEditModalComponent,
    AdminCategoryAddModalComponent,
    AdminCategoryEditModalComponent,
    AdminQuoteAddModalComponent,
    AdminQuoteEditModalComponent
  ]
})
export class AdminModule { }
