import { Component } from '@angular/core';
import { AuthService } from './Authorization/Authorization.service';
import { ApplicationUser } from './Authorization/ApplicationUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser = new ApplicationUser();

  constructor(private authService: AuthService) {
  }
}
