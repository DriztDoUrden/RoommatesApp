import { Component, OnInit } from '@angular/core';
import { NoticeModel } from '../Models/NoticeModel';
import { NoticeService } from './notice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../Authorization/Authorization.service';
import { Router } from '../../../node_modules/@angular/router';
import { ApplicationUser } from '../Models/ApplicationUser';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  listOfNotices = new Array<NoticeModel>();
  isLoading = false;
  noticeBindingModel = new NoticeModel();
  creatorMode = false;
  editMode = false;
  currentUser: ApplicationUser;

  constructor(private _noticeService: NoticeService, private _authService: AuthService, private _router: Router) { }

  createNotice() {
    this.isLoading = true;
    this._noticeService.createNotice(this.noticeBindingModel).subscribe((result: any) => {
      this.isLoading = false;
      this.creatorMode = false;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['homepage']);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });

  }
  enableEditor(notice: NoticeModel) {
    this.creatorMode = true;
    this.editMode = true;
    this.noticeBindingModel = notice;
  }
  editNotice() {
    this.isLoading = true;
    this._noticeService.editNotice(this.noticeBindingModel).subscribe((result: any) => {
      this.isLoading = false;
      this.editMode = false;
      this.creatorMode = false;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['homepage']);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }
  removeNotice(notice: NoticeModel) {
    this.noticeBindingModel = notice;
    this.isLoading = true;
    this._noticeService.removeNotice(this.noticeBindingModel).subscribe((result: any) => {
      this.isLoading = false;
      this.editMode = false;
      this.creatorMode = false;
      this.getNotices();
      this.noticeBindingModel = new NoticeModel();
      this._router.navigate(['homepage']);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }
  getNotices() {
    this.isLoading = true;
    this._noticeService.getNotices().subscribe((result: any) => {
      this.listOfNotices = result;
      this.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  ngOnInit() {
    this._authService.checkAccess();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.listOfNotices.length <= 0) {
      this.getNotices();
    }
  }
}
