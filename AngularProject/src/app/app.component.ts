import { Component } from '@angular/core';
import { AuthService } from './Authorization/Authorization.service';
import { UserLoginModel } from './Authorization/UserRegisterModel';
import { ApplicationUser } from './Models/ApplicationUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {
  }
}
