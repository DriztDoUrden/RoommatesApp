import { FlatModel } from './FlatModel';
import { ApplicationUser } from './ApplicationUser';

export class NoticeModel {
  Id: number;
  Title: string;
  Content: string;
  Flat: FlatModel;
  Author: string;
  User: ApplicationUser;
}
