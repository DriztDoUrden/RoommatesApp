import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './Authorization/auth.service';
import { ApplicationUser } from './Authorization/AppUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpService: HttpService, private authService: AuthService) {

  }

  getPosts() {
    const user = new ApplicationUser();
    user.Email = 'kijwokokoasdko@o2.pl';
    user.Password = 'Jabada55555%';
    user.ConfirmPassword = 'Jabada55555%';

    this.authService.registerUser(user).subscribe(userek => {
      console.log(userek);
    });
  }
  login() {
    const user = new ApplicationUser();
    user.Email = 'kijwokokoko@o2.pl';
    user.Password = 'Jabada55555%';
    user.ConfirmPassword = 'Jabada55555%';

    this.authService.userAuthorization(user).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      console.log(localStorage.getItem('userToken'));
    });
  }
  logout() {
    localStorage.setItem('userToken', null);
  }

  getValues() {
    console.log(localStorage.getItem('userToken'));
    this.authService.getValues().subscribe(data => {
      console.log(data);
    });
  }

  addPost() {
    const post: Post = ({
      userId: 1,
      id: 1,
      title: 'Hobbit',
      body: 'Cialo do ciala'
    });
  }
  deletePost() {

  }

  updatePost() {
    const post: Post = ({
      userId: 3,
      id: 2,
      title: 'Tam i z powrotem',
      body: 'Usta do ust'
    });
  }
  changePost() {
    const post: Post = ({
      userId: 2,
      id: 3,
      title: 'LALALALAL',
      body: 'HYHYHY'
    });
  }
}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
