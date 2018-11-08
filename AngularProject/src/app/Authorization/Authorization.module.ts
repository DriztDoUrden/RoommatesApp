import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginpanelComponent } from './loginpanel/loginpanel.component';
import { LoadingModule } from '../Features/loading/Loading.module';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../Features/loading/loading.component';
import { AuthorizationRoutingModule } from './Authorization.routing';
import { AuthService } from './Authorization.service';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    ValidatorModule,
    AuthorizationRoutingModule
  ],
  exports: [
    LoadingComponent,
    ValidatorComponent,
    AuthorizationRoutingModule
  ],
  declarations: [
    LoginpanelComponent
  ],
  providers: [AuthService]
})
export class AuthorizationModule { }
