import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Authorization/Authorization.service';
import { ResidentService } from '../resident.service';
import { ApplicationUser } from '../../Models/ApplicationUser';

@Component({
  selector: 'app-flats-init-panel',
  templateUrl: './flats-init-panel.component.html',
  styleUrls: ['./flats-init-panel.component.css']
})
export class FlatsInitPanelComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private residentService: ResidentService) { }

  isLoading = false;

  redirectToFlatCreator() {
    this.router.navigate(['flatCreator']);
  }
  redirectToFlatSearch() {
    this.router.navigate(['flatSearch']);
  }
  checkUserFlat() {

  }

  ngOnInit() {
    this.isLoading = true;
    this.authService.checkAccess();
    let hasFlat = false;
    this.residentService.checkResidentHasFlat().subscribe((data: any) => {
      hasFlat = data;
      if (hasFlat) {
        this.router.navigate(['homepage']);
        this.isLoading = false;
      }
    });
    setTimeout(() => { this.isLoading = false; }, 1500);

  }
}
