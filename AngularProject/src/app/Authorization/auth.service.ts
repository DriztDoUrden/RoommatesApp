import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationUser } from './AppUser';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private _registerUrl = 'http://localhost:49778/api/Account/Register';
  private _loginUrl = 'http://localhost:49778/token';
  private _values = 'http://localhost:49778/api/values';


  registerUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>(this._registerUrl, user);
  }

  userAuthorization(user: ApplicationUser) {
    const data = 'username=' + user.Email + '&password=' + user.Password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this._loginUrl, data, { headers: reqHeader });
  }

  getValues() {
    return this.http.get(this._values);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

}
