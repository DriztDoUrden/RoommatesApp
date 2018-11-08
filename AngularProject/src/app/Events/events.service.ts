import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from './EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _getEvents = 'http://localhost:51287/api/events/GetEvents';
  private _createEvent = 'http://localhost:51287/api/events/CreateEvent';

  constructor(private http: HttpClient) { }

  GetEvents() {
    return this.http.get<Array<EventModel>>(this._getEvents);
  }
  CreateEvent(model: EventModel) {
    return this.http.post(this._createEvent, model);
  }
}
