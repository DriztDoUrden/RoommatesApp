import { Injectable } from '@angular/core';
import { Post } from './app.component';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  address = 'https://jsonplaceholder.typicode.com/';
  api = 'http://localhost:49778/api/values';

  // Pobieramy wszystkie posty
  getPosts(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.api);
  }

  // Pobieramy post po ID
  getPost(id: number) {

  }

  // Pobieramy post po ID usera
  getPostByUserID(id: number) {

  }

  addPost(post: Post) {

  }

  updatePost(post: Post) {

  }
  deletePost(id: number) {

  }

  changePost(post: Post) {

  }
}
