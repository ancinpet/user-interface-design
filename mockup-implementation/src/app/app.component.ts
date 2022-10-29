import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  showNavPanel(): boolean {
    if (! environment.production) {
      return true;
    }

    return this.authService.isAuthenticated();
  }
}
