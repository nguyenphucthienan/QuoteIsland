import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminUserManagerComponent } from './components/admin-user-manager/admin-user-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'user',
    component: AdminUserManagerComponent
  },
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
