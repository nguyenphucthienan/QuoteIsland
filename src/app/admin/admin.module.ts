import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {
  AdminQuoteAddModalComponent,
} from './components/admin-quote-manager/admin-quote-add-modal/admin-quote-add-modal.component';
import { AdminQuoteManagerComponent } from './components/admin-quote-manager/admin-quote-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';
import { AdminQuoteManagerTableService } from './services/admin-quote-manager-table.service';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserManagerComponent,
    AdminQuoteManagerComponent,
    AdminQuoteAddModalComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    AdminQuoteManagerTableService
  ]
})
export class AdminModule { }
