import { Component, OnInit } from '@angular/core';
import { CleaningService } from './cleaning.service';
import { GlobalService } from '../Features/global.service';
import { Month } from './Models/Month';
import { HttpErrorResponse } from '@angular/common/http';
import { YearMonthDate } from './Models/YearMonthModel';
import { ResidentService } from '../Flats/resident.service';
import { ApplicationUser } from '../Models/ApplicationUser';
import { ModeEnum } from '../Features/ModeEnum';
import { CleaningSchedule } from './Models/CleaningScheduleModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.css'],
})

export class CleaningComponent implements OnInit {

  public days: Array<String> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public month: Month = new Month();
  public currentDate = new Date();
  public numberOfDays: Array<number>;
  public currentMonth: number;
  public currentYear: number;
  public FlatMembers: Array<ApplicationUser>;
  public CleaningScheduleBindingModel = new CleaningSchedule();

  constructor(private _router: Router, private _cleaningService: CleaningService,
    private _global: GlobalService, private _residentService: ResidentService) {
  }

  GetNextMonth() {
    if (this.currentMonth === 11) {
      this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
      this.currentMonth = 0;
      this.GetMonth(0);
    } else {
      this.GetMonth(1);
    }
  }

  CreateSchedule() {
    this._global.isLoading = true;
    const selectedUser = (document.getElementById('userPicker') as HTMLInputElement).value;
    const User = this.FlatMembers.filter(x => x.Email === selectedUser)[0];
    this.CleaningScheduleBindingModel.UserID = User.Id;
    this._cleaningService.CreateSchedule(this.CleaningScheduleBindingModel).subscribe(result => {
      this._global.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
    location.reload();
  }

  GetPreviousMonth() {
    if (this.currentMonth === 0) {
      this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
      this.currentMonth = 11;
      this.GetMonth(0);
    } else {
      this.GetMonth(-1);
    }
  }
  GetMonth(monthNumber: number) {
    this._global.isLoading = true;
    const date = new YearMonthDate(this.currentDate.getFullYear(), this.currentMonth + monthNumber);
    this._cleaningService.GetMonth(date).subscribe((result: Month) => {
      this.month = result;
      this.currentMonth = new Date(this.month.Days[0].Date).getMonth();
      this._global.isLoading = false;
      this.calculateNumberOfDays();
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }

  GetFlatMembers() {
    this._residentService.getFlatMembers().subscribe((result: Array<ApplicationUser>) => {
      this.FlatMembers = result;
      console.log(this.FlatMembers);
      this._global.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }

  enableCreator() {
    this._global.isLoading = true;
    setTimeout(() => { this._global.isLoading = false; this._global.currentMode = ModeEnum.Edit; }, 500);
  }

  calculateNumberOfDays() {
    const days = this.month.StartDay;
    const daysArray = new Array<number>();
    for (let _i = 0; _i < days; _i++) {
      daysArray.push(_i);
    }
    this.numberOfDays = daysArray;
  }
  get isLoading(): boolean {
    return this._global.isLoading;
  }
  get GetCurrentYear() {
    return this.currentDate.getFullYear();
  }
  get currentMode() {
    return this._global.currentMode;
  }

  ngOnInit() {
    this.GetFlatMembers();
    this.currentMonth = new Date().getMonth();
    this.GetMonth(0);
    this._global.currentMode = 0;
  }
}

