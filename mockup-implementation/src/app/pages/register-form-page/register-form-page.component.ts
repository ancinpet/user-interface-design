import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserEditFormData } from 'src/app/shared-components/user-editor/user-editor.component';

@Component({
  selector: 'app-register-form-page',
  templateUrl: './register-form-page.component.html',
  styleUrls: ['./register-form-page.component.scss']
})
export class RegisterFormPageComponent implements OnInit {

  submit$: Subject<void> = new Subject();
  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public createUser({name, lastName, email, phone, password}: UserEditFormData): void {
    this.userService.removeUser(0);
    this.userService.addUser(new User(0, name, lastName, email, phone, [], password));
    this.authService.authenticate(email, password);
    this.router.navigate(['']);
  }
}
