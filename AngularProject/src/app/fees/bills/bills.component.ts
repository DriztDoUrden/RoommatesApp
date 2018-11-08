import { Component, OnInit } from '@angular/core';
import { UtilityRatesModel } from '../../Models/UtilityRatesModel';
import { FeesService } from '../fees.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityNumbersModel } from '../../Models/UtilityNumbersModel';
import { BillsModel } from '../../Models/BillsModel';
import { ResidentService } from '../../Flats/resident.service';
import { ApplicationUser } from '../../Models/ApplicationUser';
import { Router } from '@angular/router';
import { AuthService } from '../../Authorization/Authorization.service';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(private _feesService: FeesService, private _residentService: ResidentService, private router: Router,
    private _authService: AuthService) { }
  utilitiesList = new Array<UtilityRatesModel>();
  billsList = new Array<BillsModel>();
  isLoading = false;
  utilitiesBindingModel = new BillsModel();
  editorMode = false;
  flatMembers;
  billsMonthInputModel: Date;

  editorModeClick() {
    this.editorMode = true;
    this.utilitiesBindingModel.Utilities = new Array<UtilityNumbersModel>();
    this.utilitiesList.forEach((utility, index) => {
      this.utilitiesBindingModel.Utilities[index] = new UtilityNumbersModel();
      this.utilitiesBindingModel.Utilities[index].UtilitiesRates = utility;
    });
  }
  createNewBill() {
    this.isLoading = true;
    this._feesService.createBill(this.utilitiesBindingModel).subscribe((result: any) => {
      this.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
    location.reload();
  }
  getFlatUtilityNumbers() {
    this.isLoading = true;
    this._feesService.getFlatUtilityNumbers().subscribe((result: any) => {
      this.isLoading = false;
      this.billsList = result;
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
      this.utilitiesList = result;
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
  }
  sumUp(model: BillsModel) {
    let sum = 0;
    console.log(model);
    for (const quantity of model.Utilities) {
      sum += (quantity.Quantity * quantity.UtilitiesRates.Price) + quantity.UtilitiesRates.FixedCharge;
    }
    const totalSum = sum.toFixed(2);
    return parseFloat(totalSum);
  }
  toPay(sum: number): number {
    const payment = (sum / this.flatMembers).toFixed(2);
    return parseFloat(payment);
  }
  getFlatMembers() {
    this._residentService.getFlatMembers().subscribe((result: Array<ApplicationUser>) => {
      this.flatMembers = result.length;
    });
  }
  removeBill(model: BillsModel) {
    this.isLoading = true;
    this._feesService.removeBill(model).subscribe((result: any) => {
      this.isLoading = false;
    },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(err);
      });
    location.reload();

  }
  ngOnInit() {
    this._authService.checkAccess();
    this.getFlatUtilities();
    this.getFlatUtilityNumbers();
    this.getFlatMembers();
  }
}
