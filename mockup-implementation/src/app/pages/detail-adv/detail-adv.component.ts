import {Component, Input, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {Advertisment} from '../../model/advertisment';
import {AdvertismentService} from '../../services/advertisment.service';

@Component({
  selector: 'app-detail-adv',
  templateUrl: './detail-adv.component.html',
  styleUrls: ['./detail-adv.component.scss']
})
export class DetailAdvComponent implements OnInit {
  adv: Advertisment;
  currentImageIndex: number;

  constructor(private advService: AdvertismentService, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.adv = this.advService.getCurrentAdv() !== undefined
        ? this.advService.getCurrentAdv()
        : this.advService.getAllAdverts()[0];
    this.currentImageIndex = this.adv.photosUrls.length > 0 ? 0 : undefined;
  }

  setNextImageIndex(): void {
    this.currentImageIndex++;

    if (this.currentImageIndex >= this.adv.photosUrls.length ) {
      this.currentImageIndex = 0;
    }
  }

  setPrevImageIndex(): void {
    if ( this.currentImageIndex <= 0 ) {
      this.currentImageIndex = this.adv.photosUrls.length - 1;
    } else {
      this.currentImageIndex--;
    }
  }

  getSeller(): User {
    return this.userService.getUserById(this.adv.sellerId);
  }

  goToSeller(): void {
    this.router.navigate([`/user/${this.adv.sellerId}`]);
  }

  isFavorite(): boolean {
    return this.userService.getLoggedInUser().favouriteAdvertsIds.includes(this.adv.id);
  }

  markAsFavorite(): void {
    const res = this.userService.getLoggedInUser().addFavoriteAdvert(this.adv.id);
    if (res) {
      this.snackBar.open('Added to favorites', '', {duration: 1000});
    }
  }

}
