import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedUserGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (! environment.production) {
      return true;
    }

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
