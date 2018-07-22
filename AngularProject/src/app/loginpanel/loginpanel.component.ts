import { Component, OnInit, Output } from '@angular/core';
import { ApplicationUser } from '../Authorization/ApplicationUser';
import { AuthService } from '../Authorization/Authorization.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { AppComponent } from '../app.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loginpanel',
  templateUrl: './loginpanel.component.html',
  styleUrls: ['./loginpanel.component.css']
})
export class LoginpanelComponent implements OnInit {

  constructor(private authService: AuthService) { }

  appUser = new ApplicationUser();
  currentUser = new ApplicationUser();
  loginMode = true;

  ngOnInit() {
  }

  changeMode() {
    this.loginMode = !this.loginMode;
  }
  register() {
    const user: ApplicationUser = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });
    this.authService.registerUser(user).subscribe(userek => {
      console.log(userek);
    });
    window.location.href = 'http://localhost:4200';
  }
  login() {
    const user: ApplicationUser = ({
      Email: this.appUser.Email,
      Password: this.appUser.Password,
      ConfirmPassword: this.appUser.ConfirmPassword
    });

    this.authService.userAuthorization(user).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      console.log(localStorage.getItem('userToken'));
    },
      (err: HttpErrorResponse) => {
        console.log('LIPA');
      });

  }
  logout() {
    localStorage.setItem('userToken', null);
  }

  getValues() {
    console.log(localStorage.getItem('userToken'));
    this.authService.getValues().subscribe(data => {
      console.log(data);
    });
  }
}
