import { Component, OnInit } from '@angular/core';
import { Advertisment } from 'src/app/model/advertisment';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TinderHowToComponent } from '../tinder-how-to/tinder-how-to.component'
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  templateUrl: './tinder-result-page.component.html',
  styleUrls: ['./tinder-result-page.component.scss']
})

export class TinderResultPageComponent implements OnInit {
  adverts: Advertisment[];
  currentAdvert: Advertisment;
  currentIndex: number;
  currentImage: string;
  currentImageIndex: number;

  constructor(private _bottomSheet: MatBottomSheet, private advertService: AdvertismentService, private userService: UserService, private location: Location, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.adverts = this.advertService.getAllAdverts();
    this.currentAdvert = this.advertService.getCurrentTinder();
    this.currentIndex = this.adverts.indexOf(this.currentAdvert);
    this.currentImageIndex = 0;
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
  }

  openBottomSheet(): void {
    this._bottomSheet.open(TinderHowToComponent);
  }

  before(): void {
    --this.currentImageIndex;
    this._clampImageIndex();
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
  }

  next(): void {
    ++this.currentImageIndex;
    this._clampImageIndex();
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
  }

  prevAdvert(): void {
    --this.currentIndex;
    this._clampIndex();
    this.currentImageIndex = 0;
    this.currentAdvert = this.adverts[this.currentIndex];
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
  }

  favClicked(): void {
    this.userService.getLoggedInUser().addFavoriteAdvert(this.currentAdvert.id);
    this.nextAdvert('Vehicle added to favorites!', true);
  }

  openDetail(): void {
    this.advertService.setCurrentAdv(this.currentAdvert);
    this.advertService.setCurrentTinder(this.currentAdvert);
    this.router.navigate(['/search-detail']);
  }

  nextAdvert(message: string, removeFromFav?: boolean): void {
    ++this.currentIndex;
    this._clampIndex();
    this.currentImageIndex = 0;
    this.currentAdvert = this.adverts[this.currentIndex];
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
    let snackBarRef = this._snackBar.open(message, "Undo", {
      duration: 2000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.prevAdvert();
      if (removeFromFav) {
        this.userService.getLoggedInUser().removeFavoriteAdvert(this.currentAdvert.id);
      }
    });
  }

  updateImage(): void {
    this._clampImageIndex();
    this.currentImage = this.currentAdvert.photosUrls[this.currentImageIndex];
  }

  private _clampImageIndex(): void {
    this.currentImageIndex %= this.currentAdvert.photosUrls.length;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.currentAdvert.photosUrls.length - 1;
    }
  }

  private _clampIndex(): void {
    this.currentIndex %= this.adverts.length;
    if (this.currentIndex < 0) {
      this.currentIndex = this.adverts.length - 1;
    }
  }
}
