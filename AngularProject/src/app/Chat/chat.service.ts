import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageModel } from './chat/MessageModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _saveMessage = 'http://localhost:51287/api/Chat/SaveMessage';
  private _getMessages = 'http://localhost:51287/api/Chat/GetMessages';


  constructor(private http: HttpClient) { }

  SaveMessage(message: MessageModel) {
    return this.http.post(this._saveMessage, message);
  }
  GetMessages() {
    return this.http.get(this._getMessages);
  }
}

