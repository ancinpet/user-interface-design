import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  data: LandingPageFormData = {} as LandingPageFormData;
  hasError = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  tryToLogin(): void {
    this.hasError = false;
    try {
      this.authService.authenticate(this.data.email, this.data.password);
    } catch (error) {
      this.hasError = true;
      return;
    }
    this.router.navigate(['']);
  }

}

export interface LandingPageFormData {
  email: string;
  password: string;
}
