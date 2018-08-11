import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Authorization/Authorization.service';
import { ApplicationUser } from '../Models/ApplicationUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }
  isActiveUser = localStorage.getItem('currentUser');
  currentUser: ApplicationUser;
  isLoading = false;

  logout() {
    this.isLoading = true;
    localStorage.setItem('userToken', null);
    localStorage.setItem('currentUser', 'none');
    this.router.navigate(['']);
    this.isLoading = false;
  }
  ngOnInit() {
    this.authService.checkAccess();
  }
}
