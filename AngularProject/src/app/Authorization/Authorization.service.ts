import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginModel } from './UserRegisterModel';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { ApplicationUser } from '../Models/ApplicationUser';
import { Router } from '@angular/router';


@Injectable()
export class AuthService implements OnInit {

  private _registerUrl = 'http://localhost:49778/api/Account/Register';
  private _loginUrl = 'http://localhost:49778/token';
  private _userInfoUrl = 'http://localhost:49778/api/Account/UserInfo';

  currentUser: BehaviorSubject<ApplicationUser>;
  user$: Observable<ApplicationUser>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.user$ = this.currentUser.asObservable();
  }

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

  setAuthorizarion() {
    this.currentUser = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')));
  }
  getAuthorization() {
    return of(this.currentUser);
  }
  checkAccess() {
    const user = localStorage.getItem('currentUser');
    if (user === 'none') {
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
  }
}
