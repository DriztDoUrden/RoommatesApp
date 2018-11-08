import { FlatModel } from './FlatModel';
import { UtilityRatesModel } from './UtilityRatesModel';

export class UtilityNumbersModel {
  Id: number;
  Quantity: number;
  Date: Date;
  UtilitiesRates: UtilityRatesModel;
  Flat: FlatModel;
}
