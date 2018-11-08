import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Month } from './Models/Month';
import { YearMonthDate } from './Models/YearMonthModel';
import { CleaningSchedule } from './Models/CleaningScheduleModel';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  private _getMonthDays = 'http://localhost:51287/api/cleaning/GetMonth';
  private _createSchedule = 'http://localhost:51287/api/cleaning/CreateSchedule';

  constructor(private http: HttpClient) { }

  GetMonth(date: YearMonthDate) {
    return this.http.post<Month>(this._getMonthDays, date);
  }
  CreateSchedule(model: CleaningSchedule) {
    return this.http.post(this._createSchedule, model);
  }
}

