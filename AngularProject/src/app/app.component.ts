import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './Authorization/Authorization.service';
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

  ngOnInit() {
    this.authService.checkAccess();
  }
}
