import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {}

  authenticate(email: string, password: string): void {
    const authenticatedUser = this.userService.getAllUsers().find(user => user.email === email && user.password === password);

    if (!authenticatedUser) {
      throw new Error('Incorrect email or password');
    }

    sessionStorage.setItem('token', email);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
