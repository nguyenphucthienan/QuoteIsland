import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    HeaderComponent
  ]
})
export class PublicModule { }
