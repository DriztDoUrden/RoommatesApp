import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Authorization/Authorization.service';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { Router } from '@angular/router';
import { ResidentService } from '../resident.service';
import { RoutesPaths } from '../../Constans/Routes';

@Component({
    selector: 'app-flats-homepage',
    templateUrl: './flats-homepage.component.html',
    styleUrls: ['./flats-homepage.component.css']
})
export class FlatsHomepageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private _residentService: ResidentService) { }
    isLoading = false;
    currentUser: ApplicationUser;
    logout() {
        const emptyUser: ApplicationUser = {
            Email: '',
            Id: '',
            Color: null
        };
        this.isLoading = true;
        localStorage.setItem('userToken', null);
        localStorage.setItem('currentUser', JSON.stringify(emptyUser));
        this.router.navigate(['login']);
        this.isLoading = false;
    }
    homePage() {
        this.router.navigate([RoutesPaths.Flats]);
    }
    noticePage() {
        this.router.navigate([RoutesPaths.Notices]);
    }
    feesPage() {
        this.router.navigate([RoutesPaths.Fees]);
    }
    chatPage() {
        this.router.navigate([RoutesPaths.Chat]);
    }
    eventsPage() {
        this.router.navigate([RoutesPaths.Events]);
    }
    cleaningPage() {
        console.log('REDIRECTING');
        this.router.navigate([RoutesPaths.Cleaning]);
    }

    ngOnInit() {
        this.isLoading = true;
        this.authService.checkAccess();
        this._residentService.checkResidentHasFlat();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isLoading = false;
    }
}
