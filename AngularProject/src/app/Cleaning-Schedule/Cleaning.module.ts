import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { FlatsModule } from '../Flats/Flats.module';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';
import { CleaningRoutingModule } from './Cleaning.routing';
import { CleaningService } from './cleaning.service';
import { CleaningComponent } from './cleaning.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        ValidatorModule,
        FlatsModule,
        CleaningRoutingModule
    ],
    exports: [
        LoadingComponent,
        ValidatorComponent,
        CleaningRoutingModule
    ],
    declarations: [
        CleaningComponent
    ],
    providers: [CleaningService]
})
export class CleaningModule { }
