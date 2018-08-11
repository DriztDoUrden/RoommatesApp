import { Component, OnInit } from '@angular/core';
import { FlatModel } from '../../Models/FlatModel';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Authorization/Authorization.service';

@Component({
  selector: 'app-flat-search',
  templateUrl: './flat-search.component.html',
  styleUrls: ['./flat-search.component.css']
})
export class FlatSearchComponent implements OnInit {

  constructor(private flatService: FlatService, private router: Router, private authService: AuthService) { }

  flatBindingModel = new FlatModel();
  isLoading = false;
  searchListVisible = false;
  listOfFlats: Array<FlatModel>;

  searchFlat() {
    this.searchListVisible = true;
    this.isLoading = true;
    console.log(this.flatBindingModel);
    this.flatService.searchFlat(this.flatBindingModel).subscribe((result: any) => {
      console.log(this.listOfFlats);
      setTimeout(() => { this.isLoading = false; this.listOfFlats = result; }, 1500);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  joinToFlat(flatID: number) {
    console.log(flatID);
    this.isLoading = true;
    this.flatService.joinToFlat(flatID).subscribe(data => {
      location.reload();
      this.router.navigate(['homepage']);
    });
    this.isLoading = false;
  }

  ngOnInit() {
    this.authService.checkAccess();

  }

}
