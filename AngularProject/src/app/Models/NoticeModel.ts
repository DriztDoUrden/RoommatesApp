import { FlatModel } from './FlatModel';
import { ApplicationUser } from './ApplicationUser';

export class NoticeModel {
  Id: number;
  Title: string;
  Content: string;
  Flat_Id: FlatModel;
  Author: string;
  User_Id: string;

  constructor() {
    this.Id = null;
    this.Title = null;
    this.Content = null;
    this.Flat_Id = null;
    this.Author = null;
    this.User_Id = null;
  }
}
