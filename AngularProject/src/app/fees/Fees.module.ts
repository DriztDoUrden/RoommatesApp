import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { UtilitiesRatesComponent } from './utilities-rates/utilities-rates.component';
import { FeesComponent } from './fees.component';
import { BillsComponent } from './bills/bills.component';
import { FlatsModule } from '../Flats/Flats.module';
import { FeesRoutingModule } from './Fees.routing';
import { FeesService } from './fees.service';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';
import { ContributionsComponent } from './contributions/contributions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    ValidatorModule,
    FlatsModule,
    FeesRoutingModule
  ],
  exports: [
    LoadingComponent,
    ValidatorComponent,
    FeesRoutingModule
  ],
  declarations: [
    UtilitiesRatesComponent,
    FeesComponent,
    BillsComponent,
    ContributionsComponent
  ],
  providers: [FeesService]
})
export class FeesModule { }
