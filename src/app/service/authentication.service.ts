import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_credentials');
  }

  authenticate(email:string, password: string): boolean {
    const storedCredentials = localStorage.getItem("user_credentials");

    if(storedCredentials){
      const userCredentials = JSON.parse(storedCredentials);
      return email === userCredentials.email && password === userCredentials.password;
    }
    return false;
  }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  getUserInfo(): any {
    const storedCredentials = localStorage.getItem('user_credentials');

    if (storedCredentials) {
      return JSON.parse(storedCredentials);
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem('user_credentials');
  }
}
