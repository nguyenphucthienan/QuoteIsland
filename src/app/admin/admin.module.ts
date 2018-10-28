import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminAuthorManagerComponent } from './components/admin-author-manager/admin-author-manager.component';
import { AdminQuoteManagerComponent } from './components/admin-quote-manager/admin-quote-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { AdminQuoteAddModalComponent } from './modals/admin-quote-add-modal/admin-quote-add-modal.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminQuoteManagerComponent,
    AdminQuoteAddModalComponent,
    AdminAuthorManagerComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
