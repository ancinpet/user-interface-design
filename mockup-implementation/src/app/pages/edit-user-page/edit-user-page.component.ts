import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UserEditFormData } from 'src/app/shared-components/user-editor/user-editor.component';

@Component({
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  user: User;
  submit$: Subject<void> = new Subject();
  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

  public updateUser({name, lastName, email, phone, password}: UserEditFormData): void {
    this.user.updateUserData(name, lastName, email, phone, password ?? this.user.password);
    this.location.back();
  }
}
