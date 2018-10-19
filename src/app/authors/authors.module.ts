import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';

@NgModule({
  declarations: [
    AuthorsComponent
  ],
  imports: [
    SharedModule,
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
