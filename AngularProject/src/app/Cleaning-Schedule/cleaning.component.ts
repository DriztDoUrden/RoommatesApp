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
import { CleaningScheduleNotice } from './Models/CleaningScheduleNotice';
import * as $ from 'jquery';
import { Day } from './Models/Day';
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
  public CleaningNoticeBindingModel = new CleaningScheduleNotice(null, null);
  public plus = false;
  public noticeCreator = false;

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
  ShowDetails(day: Day) {
    day.Plus = true;
    day.Notice = true;
  }
  HideDetails(day: Day) {
    day.Plus = false;
    day.Notice = false;
  }
  ShowNotice(day: Day) {
    this.noticeCreator = true;
    this.CleaningNoticeBindingModel = new CleaningScheduleNotice(day.NoticeContent, day.Date);
  }
  createNotice(day: Day) {
    this.noticeCreator = true;
    this.CleaningNoticeBindingModel = new CleaningScheduleNotice(null, day.Date);
  }
  SaveScheduleNotice(notice: String) {
    this._global.isLoading = true;
    this._cleaningService.CreateScheduleNotice(this.CleaningNoticeBindingModel).subscribe(result => {
      this.ReloadDay(this.CleaningNoticeBindingModel);
      this._global.isLoading = false;
      this.noticeCreator = false;
      this.CleaningNoticeBindingModel = new CleaningScheduleNotice(null, null);
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
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
  ReloadDay(notice: CleaningScheduleNotice) {
    this.month.Days.find(x => x.Date === notice.Date).NoticeContent = notice.Content;
  }

  ngOnInit() {
    this.GetFlatMembers();
    this.currentMonth = new Date().getMonth();
    this.GetMonth(0);
    this._global.currentMode = 0;

    $(document).click(this.clickListener);
    document.onkeydown = this.escapeListener;
  }
  escapeListener(e: any) {
    const noticeContainer = document.getElementById('notice');
    if (e.key === 'Escape') {
      noticeContainer.hidden = true;
    }
  }
  clickListener(e: any) {
    const noticeContainer = document.getElementById('notice');
    const plus = document.getElementById('plusSelector');
    const notice = document.getElementById('noticeSelector');

    if (noticeContainer !== null && !noticeContainer.contains(e.target)) {
      noticeContainer.hidden = true;
      if ((plus != null && plus.contains(e.target)) || (notice != null && notice.contains(e.target))) {
        noticeContainer.hidden = false;
        noticeContainer.style.position = 'absolute';
        noticeContainer.style.left = e.clientX + 20 + 'px';
        noticeContainer.style.top = e.clientY - noticeContainer.clientHeight + 'px';
      }
    }
  }
}


