import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  signupUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/signup', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', user);
  }
}
