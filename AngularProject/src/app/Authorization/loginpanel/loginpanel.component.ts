import { Component, OnInit, Output } from '@angular/core';
import { UserLoginModel } from '../UserRegisterModel';
import { AuthService } from '../Authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../Models/ApplicationUser';

@Component({
  selector: 'app-loginpanel',
  templateUrl: './loginpanel.component.html',
  styleUrls: ['./loginpanel.component.css']
})
export class LoginpanelComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  appUser = new UserLoginModel();
  loginMode = true;
  isLoading = false;
  httpResponse;

  ngOnInit() {
  }

  changeMode() {
    this.loginMode = !this.loginMode;
    this.httpResponse = null;
  }
  register() {
    this.isLoading = true;
    const user: UserLoginModel = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log('Register failure');
        this.appUser.Password = '';
        this.appUser.ConfirmPassword = '';
        this.isLoading = false;
      });
    this.isLoading = false;
  }
  login() {
    this.isLoading = true;
    const user: UserLoginModel = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });
    this.authService.userAuthorization(user).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.authService.setAuthorizarion();
      this.isLoading = false;
      this.router.navigate(['']);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log('Login failure');
        this.httpResponse = err.error.error_description;
        this.appUser.Password = '';
      });
  }
}
