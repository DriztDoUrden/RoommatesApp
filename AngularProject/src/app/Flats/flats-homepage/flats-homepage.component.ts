import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Authorization/Authorization.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResidentModel } from '../../Models/ResidentModel';
import { ResidentService } from '../resident.service';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { Router } from '@angular/router';

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
  isActiveFlag = true;

  logout() {
    const emptyUser: ApplicationUser = {
      Email: '',
      Id: ''
    };
    this.isLoading = true;
    localStorage.setItem('userToken', null);
    localStorage.setItem('currentUser', JSON.stringify(emptyUser));
    this.router.navigate(['login']);
    this.isLoading = false;
  }
  homePage() {
    this.router.navigate(['']);
  }
  noticePage() {
    this.router.navigate(['notices']);
  }
  feesPage() {
    this.router.navigate(['fees']);
  }

  ngOnInit() {
    this.authService.setAuthorization();
    this.authService.user$.subscribe((userData: ApplicationUser) => {
      this.currentUser = userData;
    });
  }
}



