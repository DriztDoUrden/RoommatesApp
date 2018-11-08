import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeesComponent } from './fees.component';
import { UtilitiesRatesComponent } from './utilities-rates/utilities-rates.component';
import { BillsComponent } from './bills/bills.component';
import { RoutesPaths } from '../Constans/Routes';
import { ContributionsComponent } from './contributions/contributions.component';

const routes: Routes = [

  { path: RoutesPaths.Fees, component: FeesComponent },
  { path: RoutesPaths.Utilities, component: UtilitiesRatesComponent },
  { path: RoutesPaths.Bills, component: BillsComponent },
  { path: RoutesPaths.Contributions, component: ContributionsComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class FeesRoutingModule { }

