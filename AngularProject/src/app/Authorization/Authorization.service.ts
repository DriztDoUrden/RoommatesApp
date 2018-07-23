import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginModel } from './UserRegisterModel';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../Models/ApplicationUser';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private _registerUrl = 'http://localhost:49778/api/Account/Register';
  private _loginUrl = 'http://localhost:49778/token';
  private _userInfoUrl = 'http://localhost:49778/api/Account/UserInfo';

  registerUser(user: UserLoginModel): Observable<UserLoginModel> {
    return this.http.post<UserLoginModel>(this._registerUrl, user);
  }

  userAuthorization(user: UserLoginModel) {
    const data = 'username=' + user.Email + '&password=' + user.Password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this._loginUrl, data, { headers: reqHeader });
  }

  getToken() {
    return localStorage.getItem('userToken');
  }
  getCurrentUser(): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(this._userInfoUrl);
  }
}
