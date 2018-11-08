import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { FlatsModule } from '../Flats/Flats.module';
import { NoticeComponent } from './notice.component';
import { NoticesRoutingModule } from './Notice.routing';
import { NoticeService } from './notice.service';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    ValidatorModule,
    FlatsModule,
    NoticesRoutingModule
  ],
  exports: [
    LoadingComponent,
    ValidatorComponent,
    NoticesRoutingModule
  ],
  declarations: [
    NoticeComponent
  ],
  providers: [NoticeService]
})
export class NoticesModule { }
