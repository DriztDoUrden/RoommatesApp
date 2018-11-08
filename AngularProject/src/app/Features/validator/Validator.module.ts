import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorComponent } from './validator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidatorComponent,

  ],
  exports: [
    ValidatorComponent
  ],

})
export class ValidatorModule { }
