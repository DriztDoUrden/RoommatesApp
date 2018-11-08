import { Component, OnInit, Output } from '@angular/core';
import { UserLoginModel } from '../../Models/UserRegisterModel';
import { AuthService } from '../Authorization.service';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { GlobalService } from '../../Features/global.service';
import { ValidatorService } from '../../Features/validator/validator.service';

@Component({
  selector: 'app-loginpanel',
  templateUrl: './loginpanel.component.html',
  styleUrls: ['./loginpanel.component.css']
})
export class LoginpanelComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router, private _globalService: GlobalService) {
  }

  appUser = new UserLoginModel();
  loginMode = true;
  errorList: Array<String>;
  isErrorMessageActive: boolean;

  ngOnInit() {
    this._authService.getCurrentUser().subscribe(data => {
      if (data != null) {
        this.router.navigate(['flats']);
      }
    });
    this.setLoading(false);
  }
  changeMode() {
    this.loginMode = !this.loginMode;
  }
  register() {
    this.setLoading(true);
    const user: UserLoginModel = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });
    this._authService.registerUser(user).subscribe(data => {
      console.log(data);
      location.reload();
    },
      (err: HttpErrorResponse) => {
        const errors = this._globalService.parseErrors(err.error);
        console.log(errors);
        this.errorList = errors;
        this.appUser.Password = '';
        this.appUser.ConfirmPassword = '';
        this.setLoading(false);
      });
    this.setLoading(false);
  }
  login() {
    this.setLoading(true);
    const user: UserLoginModel = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });
    this._authService.userAuthorization(user).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this._authService.setAuthorization();
      this._authService.getCurrentUser().subscribe((result: any) => {
        const currentUser = new ApplicationUser(result.Email, result.Id, result.ScheduleColor);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      });
      this.setLoading(false);
      this.router.navigate(['flats']);
    },
      (err: HttpErrorResponse) => {
        this.errorList = new Array<string>();
        this.setLoading(false);
        this.errorList.push(err.error.error_description);
        console.log(this.errorList);
        this.appUser.Password = '';
      });
  }
  get isLoading(): boolean {
    return this._globalService.isLoading;
  }
  setLoading(loading: boolean) {
    this._globalService.isLoading = loading;
  }

}
