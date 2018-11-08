import { Routes, RouterModule } from '@angular/router';
import { LoginpanelComponent } from './Authorization/loginpanel/loginpanel.component';
import { HomeComponent } from './home/home.component';
import { FlatsHomepageComponent } from './Flats/flats-homepage/flats-homepage.component';
import { FlatCreatorComponent } from './Flats/flat-creator/flat-creator.component';
import { FlatSearchComponent } from './Flats/flat-search/flat-search.component';
import { NoticeComponent } from './Notice/notice.component';
import { FeesComponent } from './fees/fees.component';
import { UtilitiesRatesComponent } from './fees/utilities-rates/utilities-rates.component';
import { BillsComponent } from './fees/bills/bills.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthorizationModule } from './Authorization/Authorization.module';
import { FlatsModule } from './Flats/Flats.module';
import { NoticesModule } from './Notice/Notices.module';
import { FeesModule } from './fees/Fees.module';
import { RoutesPaths } from './Constans/Routes';
import { CleaningModule } from './Cleaning-Schedule/Cleaning.module';
import { ChatModule } from './Chat/Chat.module';
import { EventsModule } from './Events/Events.module';


const routes: Routes = [
  { path: RoutesPaths.Default, component: HomeComponent },
  { path: RoutesPaths.Login, loadChildren: () => AuthorizationModule },
  { path: RoutesPaths.Flats, loadChildren: () => FlatsModule },
  { path: RoutesPaths.Notices, loadChildren: () => NoticesModule },
  { path: RoutesPaths.Fees, loadChildren: () => FeesModule },
  { path: RoutesPaths.Cleaning, loadChildren: () => CleaningModule },
  { path: RoutesPaths.Chat, loadChildren: () => ChatModule },
  { path: RoutesPaths.Events, loadChildren: () => EventsModule }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
