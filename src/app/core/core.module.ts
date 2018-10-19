import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

const toastrOptions = {
  timeOut: 5000,
  positionClass: 'toast-bottom-right'
};

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions),
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthService,
    AlertService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
