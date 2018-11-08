import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityRatesModel } from '../Models/UtilityRatesModel';
import { UtilityNumbersModel } from '../Models/UtilityNumbersModel';
import { BillsModel } from '../Models/BillsModel';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private _createUtility = 'http://localhost:51287/api/RentalFees/CreateUtility';
  private _getFlatUtilities = 'http://localhost:51287/api/RentalFees/GetFlatUtilities';
  private _getFlatUtilityNumbers = 'http://localhost:51287/api/RentalFees/GetFlatUtilityNumbers';
  private _removeUtility = 'http://localhost:51287/api/RentalFees/RemoveUtility';
  private _createBill = 'http://localhost:51287/api/RentalFees/CreateBill';
  private _removeBill = 'http://localhost:51287/api/RentalFees/RemoveBill';


  constructor(private http: HttpClient) { }

  createUtility(data: UtilityRatesModel) {
    return this.http.post<UtilityRatesModel>(this._createUtility, data);
  }
  getFlatUtilities() {
    return this.http.get<Array<UtilityRatesModel>>(this._getFlatUtilities);
  }
  getFlatUtilityNumbers() {
    return this.http.get<Array<UtilityNumbersModel>>(this._getFlatUtilityNumbers);
  }
  removeUtility(data: UtilityRatesModel) {
    return this.http.post<UtilityRatesModel>(this._removeUtility, data);
  }
  createBill(data: BillsModel) {
    return this.http.post<BillsModel>(this._createBill, data);
  }
  removeBill(data: BillsModel) {
    return this.http.post<BillsModel>(this._removeBill, data);
  }
}
