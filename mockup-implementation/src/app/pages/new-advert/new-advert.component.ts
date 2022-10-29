import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Advertisment } from 'src/app/model/advertisment';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';

class Trash {
  shit = null;
  value = "";
  constructor(shit: any, value: string) {
    this.shit = shit;
    this.value = value;
  }
}

@Component({
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.scss']
})

export class NewAdvertComponent implements OnInit {
  adImage;
  adGallery;
  adBrand;
  adFuel;
  adUsage;
  adModel;
  adEngine;
  adYear;
  adPrice;
  adMile;
  extraDetails: Trash[] = [new Trash(null, "")];
  canContinueFirst = false;
  hideUpload = true;
  spinUpload = true;
  spinProgress = 0;
  photos: string[];
  currentImage: string;
  currentImageIndex: number;
  allFuels: string[] = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  allCars: string[] = ['Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 'Chevrolet',
                       'Chrysler', 'Citroën', 'Dacia', 'Daewoo', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai',
                       'Jaguar', 'Jeep', 'Kia', 'Lada', 'Lamborghini', 'Land Rover', 'Lexus', 'Lotus', 'Mazda', 
                       'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Rolls-Royce',
                       'Rover', 'Seat', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'];
  allPricesFrom: string[] = ['0', '5000', '10000', '15000', '20000', '25000', '30000', '40000', '50000', '60000', '80000', 
                       '100000', '125000', '150000', '175000', '200000', '250000', '300000', '350000', '400000',
                       '500000', '600000', '700000', '800000', '900000', '1000000', '1200000', '1400000', '1600000',
                       '1800000', '2000000', '2500000', '3000000', '3500000', '4000000', '5000000'];
  allPricesTo: string[] = ['Unlimited', '5000', '10000', '15000', '20000', '25000', '30000', '40000', '50000', '60000', '80000', 
                       '100000', '125000', '150000', '175000', '200000', '250000', '300000', '350000', '400000',
                       '500000', '600000', '700000', '800000', '900000', '1000000', '1200000', '1400000', '1600000',
                       '1800000', '2000000', '2500000', '3000000', '3500000', '4000000', '5000000'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  carOptions: Observable<string[]>;
  fuelOptions: Observable<string[]>;
  
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private advertService: AdvertismentService, private _ValidatorsService: ValidatorsService, private _bottomSheet: MatBottomSheet) {}

  @ViewChild('stepper') stepping: MatStepper;

  ngOnInit() {
    this.currentImageIndex = 0;
    this.photos = [...new Array(10)].map((_,i) => '/assets/1-' + (i + 1) + '.jpg');
    this.currentImage = this.photos[this.currentImageIndex];
    this.firstFormGroup = this._formBuilder.group({
      imageControl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      carControl: ['', Validators.required],
      fuelControl: ['', Validators.required],
      modelControl: ['', Validators.required],
      manuControl: ['', [Validators.required, this._ValidatorsService.isYear]],
      engineControl: ['', []],
      usageControl: ['', [this._ValidatorsService.isUsage]],
      priceControl: ['', [Validators.required, this._ValidatorsService.isPrice]],
      mileControl: ['', [Validators.required, this._ValidatorsService.isMileage]]
    });
    this.carOptions = this.secondFormGroup.valueChanges.pipe(
      startWith(''),
      map(value => value && value.carControl ? this._filterCar(value.carControl) : this.allCars.slice()),
    );
    this.fuelOptions = this.secondFormGroup.valueChanges.pipe(
      startWith(''),
      map(value => value && value.fuelControl ? this._filterFuel(value.fuelControl) : this.allFuels.slice()),
    );
    this.adGallery = this.photos;
  }

  priceChanged(): void {
  }

  mileChanged(): void {
    if (this.adMile.indexOf(' km') > 0) {
      setTimeout(() => {
        if (this.stepping.selectedIndex != 2) {
          this.stepping.next();
        }
      }, 250);
    }
  }

  openTOSSheet(): void {
    this._bottomSheet.open(TermsOfServiceComponent);
  }

  addAdvertToDB(): void {
    this._snackBar.open("The advertisement has been published.", null, {
      duration: 2000,
    });
    let extra: string[] = [];
    for (let extraDetail of this.extraDetails) {
      if (extraDetail.value != "") {
        extra.push(extraDetail.value);
      }
    }
    let ad: Advertisment = new Advertisment(0, 0, this.adGallery, this.adBrand, this.adModel, this.adPrice, [["Mileage", this.adMile], ["Manufactured", this.adYear], ["Engine", this.adEngine], ["Fuel type", this.adFuel], ["Fuel usage", this.adUsage]], extra);
    this.advertService.addAdvert(ad);
  }

  removeCurrentDetail(index): void {
    if (index < this.extraDetails.length - 1) {
      this.extraDetails.splice(index, 1);
    }
  }

  additionalChanged(index): void {
    if (index == this.extraDetails.length - 1) {
      this.extraDetails.push(new Trash(null, ''));
    }
  }

  private _filterCar(value): string[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.allCars.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterFuel(value): string[] {
    if (!value) {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.allFuels.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  before(): void {
    --this.currentImageIndex;
    this._clampImageIndex();
    this.currentImage = this.photos[this.currentImageIndex];
  }

  next(): void {
    ++this.currentImageIndex;
    this._clampImageIndex();
    this.currentImage = this.photos[this.currentImageIndex];
  }

  uploaded(): void {
    this.adImage = 'yes';
    this.canContinueFirst = true;
    this.hideUpload = false;
    setTimeout(() => {
      this.spinUpload = false;
      if (this.stepping.selectedIndex == 0) {
        this.stepping.next();
      }
    }, 6000);
    for (let i = 1; i <= 6; ++i) {
      setTimeout(() => {
        this.spinProgress += 17;
      }, 900 * i);
    }
  }

  updateImage(): void {
    this._clampImageIndex();
    this.currentImage = this.photos[this.currentImageIndex];
  }

  private _clampImageIndex(): void {
    this.currentImageIndex %= this.photos.length;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.photos.length - 1;
    }
  }
}