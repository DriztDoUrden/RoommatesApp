import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Authorization/Authorization.service';
import { ApplicationUser } from '../Models/ApplicationUser';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  isActiveUser = localStorage.getItem('currentUser');
  currentUser: ApplicationUser;
  isLoading = false;

  logout() {
    this.isLoading = true;
    localStorage.setItem('userToken', null);
    localStorage.setItem('currentUser', 'none');
    location.reload();
  }
  ngOnInit() {
    if (this.isActiveUser !== 'none') {
      this.currentUser = JSON.parse(this.isActiveUser);
    }
  }
}
