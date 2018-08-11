import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './Authorization/Authorization.service';
import { UserLoginModel } from './Authorization/UserRegisterModel';
import { ApplicationUser } from './Models/ApplicationUser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {
  }
  currentUser: ApplicationUser;
  isLoading = false;
  isActive = false;

  logout() {
    this.isLoading = true;
    localStorage.setItem('userToken', null);
    localStorage.setItem('currentUser', 'none');
    this.router.navigate(['login']);
    this.isLoading = false;
  }
  homePage() {
    this.router.navigate(['']);
  }
  ngOnInit() {
  }
}
