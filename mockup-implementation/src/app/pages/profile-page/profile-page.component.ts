import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  user: User;
  isLoggedUser: boolean;
  private subscription: Subscription;
  constructor(private userService: UserService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => this.loadUser(parseInt(params.id, 10)));
  }

  private loadUser(id: number): void {
    this.user = this.userService.getUserById(id);
    this.isLoggedUser = this. user === this.userService.getLoggedInUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
