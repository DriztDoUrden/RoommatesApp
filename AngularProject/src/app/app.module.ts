import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './Authorization/TokenInterceptor.service';
import { AuthService } from './Authorization/Authorization.service';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationModule } from './Authorization/Authorization.module';
import { FlatsModule } from './Flats/Flats.module';
import { NoticesModule } from './Notice/Notices.module';
import { FeesModule } from './fees/Fees.module';
import { AppRoutingModule } from './app.routing';
import { GlobalService } from './Features/global.service';
import { ValidatorService } from './Features/validator/validator.service';
import { CleaningModule } from './Cleaning-Schedule/Cleaning.module';
import { GrowlModule } from 'primeng/primeng';
import { ChatModule } from './Chat/Chat.module';
import { EventsComponent } from './Events/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AuthorizationModule,
    FlatsModule,
    FeesModule,
    NoticesModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    CleaningModule,
    GrowlModule,
    ChatModule
  ],
  exports: [],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, GlobalService, ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
