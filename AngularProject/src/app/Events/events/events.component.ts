import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { GlobalService } from '../../Features/global.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventModel } from '../EventModel';
import { ModeEnum } from '../../Features/ModeEnum';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private _eventService: EventsService, private _global: GlobalService) { }

  public EventsList = new Array<EventModel>();
  public EventBindingModel = new EventModel();
  public monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  GetEvents() {
    this._global.isLoading = true;
    this._eventService.GetEvents().subscribe(result => {
      this.EventsList = result;
      this._global.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }
  CreateEvent() {
    this._global.isLoading = true;
    this._eventService.CreateEvent(this.EventBindingModel).subscribe(result => {
      this._global.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this._global.isLoading = false;
        console.log(err);
      });
  }
  enableCreator() {
    this._global.currentMode = ModeEnum.Create;
    this.EventBindingModel = new EventModel();
  }

  get isLoading(): boolean {
    return this._global.isLoading;
  }

  getMonthName(model: Date): string {
    const date = new Date(model);
    return this.monthNames[date.getMonth()];
  }
  getDayNumber(model: Date): number {
    const date = new Date(model);
    return date.getDate();
  }

  get currentMode() {
    return this._global.currentMode;
  }

  ngOnInit() {
    this.GetEvents();
    this._global.currentMode = 0;
  }

}
