import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoleGuard } from '../core/guards/auth-role.service';
import { AdminComponent } from './admin.component';
import { AdminQuoteManagerComponent } from './components/admin-quote-manager/admin-quote-manager.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin', 'Moderator'] }
  },
  {
    path: 'users',
    component: AdminUserManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'quotes',
    component: AdminQuoteManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin', 'Moderator'] }
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
export class AdminRoutingModule { }
