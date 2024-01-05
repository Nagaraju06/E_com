import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLoggedIn(): boolean {
    // Check if the user is logged in by validating the presence of user credentials
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

  getUserInfo(): any {
    // Retrieve user credentials from localStorage
    const storedCredentials = localStorage.getItem('user_credentials');

    if (storedCredentials) {
      return JSON.parse(storedCredentials);
    }

    return null;
  }

  logout(): void {
    // Clear user credentials on logout
    localStorage.removeItem('user_credentials');
  }
}
