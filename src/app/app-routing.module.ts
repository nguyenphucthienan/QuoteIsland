import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './public/components/about/about.component';
import { HomeComponent } from './public/components/home/home.component';
import { LoginComponent } from './public/components/login/login.component';
import { NotFoundComponent } from './public/components/not-found/not-found.component';
import { RegisterComponent } from './public/components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'quotes', loadChildren: './quotes/quotes.module#QuotesModule' },
  { path: 'authors', loadChildren: './authors/authors.module#AuthorsModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
