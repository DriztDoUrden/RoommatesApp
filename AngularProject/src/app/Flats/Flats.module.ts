import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { FlatCreatorComponent } from './flat-creator/flat-creator.component';
import { FlatSearchComponent } from './flat-search/flat-search.component';
import { FlatsHomepageComponent } from './flats-homepage/flats-homepage.component';
import { FlatsInitPanelComponent } from './flats-init-panel/flats-init-panel.component';
import { FlatService } from './flat.service';
import { FlatsRoutingModule } from './Flats.routing';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    ValidatorModule,
    FlatsRoutingModule
  ],
  exports: [
    LoadingComponent,
    ValidatorComponent,
    FlatsInitPanelComponent,
    FlatsHomepageComponent,
    FlatsRoutingModule
  ],
  declarations: [
    FlatCreatorComponent,
    FlatSearchComponent,
    FlatsHomepageComponent,
    FlatsInitPanelComponent
  ],
  providers: [FlatService]
})
export class FlatsModule { }
