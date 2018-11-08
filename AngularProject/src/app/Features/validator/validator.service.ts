import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() {
    this.errorList = new Array<String>();
    this.isErrorMessageActive = false;
  }

  public errorList: Array<String>;
  public isErrorMessageActive: boolean;

}
