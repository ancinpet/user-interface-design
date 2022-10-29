import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Advertisment } from 'src/app/model/advertisment';
import { User } from 'src/app/model/user';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './users-ads-page.component.html',
  styleUrls: ['./users-ads-page.component.scss']
})
export class UsersAdsPageComponent implements OnInit, OnDestroy {

  user: User;
  isLoggedUser: boolean;
  listType = 'basic';
  adverts: Advertisment[];
  private subscription: Subscription;
  constructor(private userService: UserService, private advertService: AdvertismentService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => this.loadUser(parseInt(params.id, 10)));
  }

  private loadUser(id: number): void {
    this.user = this.userService.getUserById(id);
    this.isLoggedUser = this. user === this.userService.getLoggedInUser();
    if (this.isLoggedUser) {
      this.listType = 'user-ads';
    }
    this.adverts = this.advertService.getAllAdverts().filter(ad => ad.sellerId === this.user.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
