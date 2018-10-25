import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { ProgressAnimationType, ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { AuthRoleGuard } from './guards/auth-role.service';
import { ModalModule } from './modal/modal.module';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { AuthorService } from './services/author.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { QuoteService } from './services/quote.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const jwtOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes
  }
};

const toastrOptions = {
  timeOut: 5000,
  positionClass: 'toast-bottom-right',
  progressBar: true,
  progressAnimation: 'increasing' as ProgressAnimationType
};

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HasRoleDirective
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild([]),
    BrowserAnimationsModule,
    JwtModule.forRoot(jwtOptions),
    ToastrModule.forRoot(toastrOptions),
    SharedModule,
    ModalModule
  ],
  exports: [
    HeaderComponent,
    HasRoleDirective
  ],
  providers: [
    AuthService,
    AlertService,
    AuthRoleGuard,
    QuoteService,
    AuthorService,
    CategoryService,
    CommentService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
