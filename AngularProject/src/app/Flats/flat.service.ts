import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlatModel } from '../Models/FlatModel';
import { ApplicationUser } from '../Models/ApplicationUser';
import { ResidentModel } from '../Models/ResidentModel';

@Injectable()
export class FlatService implements OnInit {


  private _createFlat = 'http://localhost:49778/api/Flats/CreateFlat';
  private _joinFlat = 'http://localhost:49778/api/Flats/JoinToFlat';
  private _searchFlat = 'http://localhost:49778/api/Flats/SearchFlat';


  constructor(private http: HttpClient) { }

  createFlat(flat: FlatModel): Observable<FlatModel> {
    return this.http.post<FlatModel>(this._createFlat, flat);
  }
  joinToFlat(flatID: number) {
    return this.http.post(this._joinFlat, flatID);
  }
  searchFlat(flat: FlatModel) {
    return this.http.post<FlatModel>(this._searchFlat, flat);
  }

  ngOnInit(): void {

  }

}
