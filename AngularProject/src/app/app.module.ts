import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Authorization/TokenInterceptor.service';
import { AuthService } from './Authorization/Authorization.service';
import { LoginpanelComponent } from './Authorization/loginpanel/loginpanel.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './Features/loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatsInitPanelComponent } from './Flats/flats-init-panel/flats-init-panel.component';
import { FlatCreatorComponent } from './Flats/flat-creator/flat-creator.component';
import { FlatService } from './Flats/flat.service';
import { FlatsHomepageComponent } from './Flats/flats-homepage/flats-homepage.component';
import { FlatSearchComponent } from './Flats/flat-search/flat-search.component';
import { NoticeComponent } from './Notice/notice.component';
import { NoticeService } from './Notice/notice.service';
import { FeesComponent } from './fees/fees.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpanelComponent,
    HomeComponent,
    LoadingComponent,
    FlatsInitPanelComponent,
    FlatCreatorComponent,
    FlatsHomepageComponent,
    FlatSearchComponent,
    NoticeComponent,
    FeesComponent
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
      },
      {
        path: 'homepage',
        component: FlatsHomepageComponent
      },
      {
        path: 'flatCreator',
        component: FlatCreatorComponent
      },
      {
        path: 'flatSearch',
        component: FlatSearchComponent
      },
      {
        path: 'notices',
        component: NoticeComponent
      },
      {
        path: 'fees',
        component: FeesComponent
      }
    ])
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, FlatService, NoticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
