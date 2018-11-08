import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginModel } from '../Models/UserRegisterModel';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { ApplicationUser } from '../Models/ApplicationUser';
import { Router } from '@angular/router';


@Injectable()
export class AuthService implements OnInit {

  private _registerUrl = 'http://localhost:51287/api/Account/Register';
  private _loginUrl = 'http://localhost:51287/token';
  private _getCurrentUser = 'http://localhost:51287/api/Account/GetCurrentUser';


  currentUser: BehaviorSubject<ApplicationUser>;
  user$: Observable<ApplicationUser>;

  constructor(private http: HttpClient, private router: Router) {
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

  setAuthorization() {
    this.currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.user$ = this.currentUser.asObservable();
  }
  getAuthorization() {
    return of(this.currentUser);
  }
  checkAuthorization() {
    const user: ApplicationUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (user != null) {
      return true;
    }
    return false;
  }
  checkAccess() {
    const user: ApplicationUser = JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      if (user.Email.length < 1) {
        this.router.navigate(['login']);
      }
    }

  }
  getCurrentUser() {
    return this.http.get(this._getCurrentUser);
  }
  ngOnInit(): void {
  }
}
