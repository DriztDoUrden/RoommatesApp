import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlatModel } from '../Models/FlatModel';
import { ApplicationUser } from '../Models/ApplicationUser';
import { ResidentModel } from '../Models/ResidentModel';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResidentService implements OnInit {


  private _residentInfo = 'http://localhost:49778/api/Residents/ResidentInfo';
  private _checkResidentFlat = 'http://localhost:49778/api/Residents/CheckResidentFlat';
  constructor(private http: HttpClient, private router: Router) { }

  currentResident: Observable<ResidentModel>;

  getResidentInfo(): Observable<ResidentModel> {
    return this.http.get<ResidentModel>(this._residentInfo);
  }
  checkResidentHasFlat() {
    return this.http.get<boolean>(this._checkResidentFlat);
  }
  ngOnInit(): void {

  }
}
