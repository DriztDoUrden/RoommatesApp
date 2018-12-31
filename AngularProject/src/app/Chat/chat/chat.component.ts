import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { ChatService } from '../chat.service';
import { GlobalService } from '../../Features/global.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModel } from './MessageModel';
import { ResidentService } from '../../Flats/resident.service';
import { ResidentModel } from '../../Models/ResidentModel';
import { Msg } from './Msg';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    public connection = new HubConnectionBuilder().withUrl('http://localhost:54065/api/message').build();
    public messageModel = new Msg();
    public currentUser = new ApplicationUser('', '', null);
    public messagesList = new Array<MessageModel>();
    constructor(private _chatService: ChatService, private _globalService: GlobalService,
        private _residentService: ResidentService) { }

    sendMessage() {
        if (this.messageModel.Content != null) {
            this._residentService.getResidentInfo().subscribe((result: ResidentModel) => {
                this.currentUser = result.User;
                this.messageModel.UserName = this.currentUser.Email;
                this.connection.invoke('send', this.messageModel);
            },
                (err: HttpErrorResponse) => {
                    console.log(err);
                });
            this._globalService.isLoading = true;
            const mes = new MessageModel();
            mes.Content = this.messageModel.Content;
            this._chatService.SaveMessage(mes).subscribe(() => {
                this._globalService.isLoading = false;
            },
                (err: HttpErrorResponse) => {
                    this._globalService.isLoading = false;
                    console.log(err);
                });
        }
    }

    get isLoading(): boolean {
        return this._globalService.isLoading;
    }
    onKeydown(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }
    ngOnInit() {
        this._residentService.getResidentInfo().subscribe((result: ResidentModel) => {
            this.currentUser = result.User;
            console.log(result.User);
        },
            (err: HttpErrorResponse) => {
                console.log(err);
            });
        this.connection.on('send', message => {
            const mes = new MessageModel();
            mes.Content = message.content;
            mes.UserName = message.userName;
            this.messagesList.push(mes);
            this.messageModel = new Msg();
        });
        this.connection.start()
            .catch(er => {
                console.log(er);
            });
        if (this.messagesList.length === 0) {
            this._globalService.isLoading = true;
            this._chatService.GetMessages().subscribe((result: Array<MessageModel>) => {
                this.messagesList = result;
                this._globalService.isLoading = false;
            },
                (err: HttpErrorResponse) => {
                    this._globalService.isLoading = false;
                    console.log(err);
                });
        }

    }
}
