import { Component, OnInit } from '@angular/core';
import { Advertisment } from 'src/app/model/advertisment';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './favourite-ads-page.component.html',
  styleUrls: ['./favourite-ads-page.component.scss']
})
export class FavouriteAdsPageComponent implements OnInit {

  listType = 'favorites';
  adverts: Advertisment[];

  constructor(private userService: UserService, private advertService: AdvertismentService) { }

  ngOnInit(): void {
    const favoritesIds = this.userService.getLoggedInUser().favouriteAdvertsIds;
    this.adverts = this.advertService.getAllAdverts().filter(ad => favoritesIds.some(favId => favId === ad.id));
  }

}
