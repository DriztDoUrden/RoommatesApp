import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoticeModel } from '../Models/NoticeModel';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private _createNotice = 'http://localhost:51287/api/Notices/CreateNotice';
  private _getNotices = 'http://localhost:51287/api/Notices/GetNotices';
  private _editNotice = 'http://localhost:51287/api/Notices/EditNotice';
  private _removeNotice = 'http://localhost:51287/api/Notices/RemoveNotice';


  constructor(private http: HttpClient) { }

  createNotice(data: NoticeModel) {
    return this.http.post<NoticeModel>(this._createNotice, data);
  }
  editNotice(data: NoticeModel) {
    return this.http.post<NoticeModel>(this._editNotice, data);
  }
  removeNotice(data: NoticeModel) {
    return this.http.post<NoticeModel>(this._removeNotice, data);
  }
  getNotices() {
    return this.http.get<Array<NoticeModel>>(this._getNotices);
  }

}
