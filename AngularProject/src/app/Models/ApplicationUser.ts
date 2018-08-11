export class ApplicationUser {
  Id: string;
  Email: string;
  constructor(email: string, id: string) {
    this.Id = id;
    this.Email = email;
  }
}
