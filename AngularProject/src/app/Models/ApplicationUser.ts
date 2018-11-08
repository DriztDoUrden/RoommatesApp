import { Color } from '../Cleaning-Schedule/Models/Color';

export class ApplicationUser {
  Id: string;
  Email: string;
  Color: Color;
  constructor(email: string, id: string, scheduleColor: Color) {
    this.Id = id;
    this.Email = email;
    this.Color = scheduleColor;
  }
}
