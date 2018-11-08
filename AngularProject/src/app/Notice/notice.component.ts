import { Component, OnInit } from '@angular/core';
import { NoticeModel } from '../Models/NoticeModel';
import { NoticeService } from './notice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Authorization/Authorization.service';
import { Router } from '@angular/router';
import { ApplicationUser } from '../Models/ApplicationUser';
import { GlobalService } from '../Features/global.service';
import { ModeEnum } from '../Features/ModeEnum';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  listOfNotices = new Array<NoticeModel>();
  noticeBindingModel = new NoticeModel();
  currentUser: ApplicationUser;

  constructor(private _noticeService: NoticeService, private _authService: AuthService, private _router: Router,
    private _global: GlobalService) { }

  createNotice() {
    this._global.isLoading = true;
    this._noticeService.createNotice(this.noticeBindingModel).subscribe((result: any) => {
      this._global.isLoading = false;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['notices']);
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });

  }
  enableEditor(notice: NoticeModel) {
    this._global.currentMode = ModeEnum.Edit;
    this.noticeBindingModel = notice;
  }
  editNotice() {
    this._global.isLoading = true;
    this._noticeService.editNotice(this.noticeBindingModel).subscribe((result: any) => {
      this._global.isLoading = false;
      this._global.currentMode = ModeEnum.Buffer;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['notices']);
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }
  removeNotice(notice: NoticeModel) {
    this.noticeBindingModel = notice;
    this._global.isLoading = true;
    this._noticeService.removeNotice(this.noticeBindingModel).subscribe((result: any) => {
      this._global.isLoading = false;
      this._global.currentMode = ModeEnum.Buffer;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['notices']);
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }
  getNotices() {
    this._global.isLoading = true;
    this._noticeService.getNotices().subscribe((result: any) => {
      this.listOfNotices = result;
      this._global.isLoading = false;
      this._global.currentMode = ModeEnum.Buffer;
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }

  get isLoading(): boolean {
    return this._global.isLoading;
  }
  get currentMode() {
    return this._global.currentMode;
  }
  set currentMode(value: number) {
    this._global.currentMode = value;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._authService.checkAccess();
    if (this.listOfNotices.length <= 0) {
      this.getNotices();
    }
  }
}
