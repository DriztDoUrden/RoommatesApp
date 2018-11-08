import { FlatModel } from './FlatModel';
import { UtilityNumbersModel } from './UtilityNumbersModel';

export class BillsModel {
  Id: number;
  Utilities: Array<UtilityNumbersModel>;
  Flat: FlatModel;
  UtilitiesMonth: string;
  UtilitiesDate: Date;
}
