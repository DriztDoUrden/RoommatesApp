import { Component, OnInit, Output } from '@angular/core';
import { UserLoginModel } from '../UserRegisterModel';
import { AuthService } from '../Authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loginpanel',
  templateUrl: './loginpanel.component.html',
  styleUrls: ['./loginpanel.component.css']
})
export class LoginpanelComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  appUser = new UserLoginModel();
  loginMode = true;
  isLoading = false;

  ngOnInit() {
  }

  changeMode() {
    this.loginMode = !this.loginMode;
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
      location.reload();
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
      location.reload();
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log('Login failure');
        this.appUser.Password = '';
      });
  }
}
