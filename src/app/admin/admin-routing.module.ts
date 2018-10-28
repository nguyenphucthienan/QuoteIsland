import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoleGuard } from '../core/guards/auth-role.service';
import { AdminComponent } from './admin.component';
import { AdminAuthorManagerComponent } from './components/admin-author-manager/admin-author-manager.component';
import { AdminCategoryManagerComponent } from './components/admin-category-manager/admin-category-manager.component';
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
    path: 'authors',
    component: AdminAuthorManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin', 'Moderator'] }
  },
  {
    path: 'categories',
    component: AdminCategoryManagerComponent,
    canActivate: [AuthRoleGuard],
    data: { roles: ['Admin', 'Moderator'] }
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
