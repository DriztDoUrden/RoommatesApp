import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Authorization/Authorization.service';
import { Observable, BehaviorSubject } from '../../../../node_modules/rxjs';
import { ResidentModel } from '../../Models/ResidentModel';
import { ResidentService } from '../resident.service';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-flats-homepage',
  templateUrl: './flats-homepage.component.html',
  styleUrls: ['./flats-homepage.component.css']
})
export class FlatsHomepageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
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
  func() {
    const user: ApplicationUser = {
      Email: 'as',
      Id: 'a12'
    };
    this.authService.currentUser.next(user);
  }
  ngOnInit() {
    this.authService.checkAccess();
    this.authService.user$.subscribe((userData: ApplicationUser) => { this.currentUser = userData; });
  }
}



