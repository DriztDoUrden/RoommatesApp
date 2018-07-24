import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Authorization/TokenInterceptor.service';
import { AuthService } from './Authorization/Authorization.service';
import { LoginpanelComponent } from '../app/Authorization/loginpanel/loginpanel.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './Features/loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatsInitPanelComponent } from './Flats/flats-init-panel/flats-init-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpanelComponent,
    HomeComponent,
    LoadingComponent,
    FlatsInitPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginpanelComponent
      }
    ])
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
