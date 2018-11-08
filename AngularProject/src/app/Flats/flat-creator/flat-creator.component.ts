import { Component, OnInit } from '@angular/core';
import { FlatModel } from '../../Models/FlatModel';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../Authorization/Authorization.service';

@Component({
  selector: 'app-flat-creator',
  templateUrl: './flat-creator.component.html',
  styleUrls: ['./flat-creator.component.css']
})
export class FlatCreatorComponent implements OnInit {

  constructor(private flatService: FlatService, private router: Router, private authService: AuthService) { }

  flatBindingModel = new FlatModel();
  isLoading = false;

  createFlat() {

    this.isLoading = true;
    const flat: FlatModel = ({
      Id: null,
      Address: this.flatBindingModel.Address,
      City: this.flatBindingModel.City,
      FlatName: this.flatBindingModel.FlatName
    });

    this.flatService.createFlat(flat).subscribe((data: any) => {
      this.isLoading = false;
      location.reload();
      this.router.navigate(['flats']);
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  ngOnInit() {
    this.authService.checkAccess();
  }

}
