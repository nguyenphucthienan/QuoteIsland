import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { MoodSelectModalComponent } from './modals/mood-select-modal/mood-select-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    MoodSelectModalComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    MoodSelectModalComponent
  ]
})
export class PublicModule { }
