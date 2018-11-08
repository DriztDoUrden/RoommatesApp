import { Component, OnInit } from '@angular/core';
import { UtilityRatesModel } from '../../Models/UtilityRatesModel';
import { FeesService } from '../fees.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-utilities-rates',
  templateUrl: './utilities-rates.component.html',
  styleUrls: ['./utilities-rates.component.css']
})
export class UtilitiesRatesComponent implements OnInit {


  utilityBindingModel = new UtilityRatesModel();
  listOfFlatUtilities = new Array<UtilityRatesModel>();
  isLoading = false;
  editorMode = false;

  constructor(private _feesService: FeesService, private _router: Router) { }

  createUtility() {
    this.isLoading = true;
    this._feesService.createUtility(this.utilityBindingModel).subscribe((result: any) => {
      this.isLoading = false;
      this.editorMode = false;
      this.utilityBindingModel = new UtilityRatesModel();
      this._router.navigate(['utilities']);
      this.getFlatUtilities();
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }
  getFlatUtilities() {
    this.isLoading = true;
    this._feesService.getFlatUtilities().subscribe((result: any) => {
      this.isLoading = false;
      console.log(result);
      this.listOfFlatUtilities = result;
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }
  removeFlatUtility(model: UtilityRatesModel) {
    this.isLoading = true;
    this._feesService.removeUtility(model).subscribe((result: any) => {
      this.isLoading = false;
      this.getFlatUtilities();
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  ngOnInit() {
    this.getFlatUtilities();
  }

}
