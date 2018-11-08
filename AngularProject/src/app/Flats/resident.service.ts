import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlatModel } from '../Models/FlatModel';
import { ApplicationUser } from '../Models/ApplicationUser';
import { ResidentModel } from '../Models/ResidentModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResidentService implements OnInit {


  private _residentInfo = 'http://localhost:51287/api/Residents/ResidentInfo';
  private _checkResidentFlat = 'http://localhost:51287/api/Residents/CheckResidentFlat';
  private _getFlatMembers = 'http://localhost:51287/api/Residents/GetFlatMembers';

  constructor(private http: HttpClient, private router: Router) { }


  getResidentInfo() {
    return this.http.get<ResidentModel>(this._residentInfo);
  }
  checkResidentHasFlat() {
    this.http.get<boolean>(this._checkResidentFlat).subscribe(data => {
      if (data === false) {
        this.router.navigate(['flatInit']);
      }
    });
  }
  getFlatMembers() {
    return this.http.get<Array<ApplicationUser>>(this._getFlatMembers);
  }
  ngOnInit(): void {

  }
}
