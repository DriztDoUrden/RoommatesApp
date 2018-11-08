import { Injectable } from '@angular/core';
import { ModeEnum } from './ModeEnum';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public currentMode: ModeEnum;
  public isLoading: boolean;

  constructor() { }

  parseErrors(errors: Array<String>): Array<String> {
    const errorList = new Array<String>();
    for (const error of errors) {
      errorList.push(error);
    }
    return errorList;
  }
}
