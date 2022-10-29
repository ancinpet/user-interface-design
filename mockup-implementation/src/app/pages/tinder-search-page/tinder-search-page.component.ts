import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { TinderHowToComponent } from '../tinder-how-to/tinder-how-to.component'

var priceDiffError = false;
var priceFromError = false;
var priceToError = false;

export class MyFromStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return priceDiffError || priceFromError;
  }
}

export class MyToStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return priceDiffError || priceToError;
  }
}

@Component({
  selector: 'app-tinder-search-page',
  templateUrl: './tinder-search-page.component.html',
  styleUrls: ['./tinder-search-page.component.scss']
})

export class TinderSearchPageComponent implements OnInit {
  priceFromValue = '0 CZK';
  priceToValue = 'Unlimited';
  ageValue = 120;
  priceDiffErrorC = false;
  priceFromErrorC = false;
  priceToErrorC = false;
  priceMin = 0;
  priceMax = 10000000;
  carInputHidden = false;
  fuelInputHidden = false;
  visible = true;
  selectable = false;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fuelCtrl = new FormControl();
  carCtrl = new FormControl();
  priceFromCtrl = new FormControl();
  priceToCtrl = new FormControl();
  filteredPriceFrom: Observable<string[]>;
  filteredPriceTo: Observable<string[]>;
  filteredFuels: Observable<string[]>;
  filteredCars: Observable<string[]>;
  matcherFrom = new MyFromStateMatcher();
  matcherTo = new MyToStateMatcher();
  fuels: string[] = ['Gasoline', 'Hybrid', 'Electric'];
  allFuels: string[] = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  cars: string[] = ['All'];
  allCars: string[] = ['All', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Cadillac', 'Chevrolet',
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

  @ViewChild('carInput') carInput: ElementRef<HTMLInputElement>;
  @ViewChild('fuelInput') fuelInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoFuel') matAutocompleteFuel: MatAutocomplete;
  @ViewChild('autoCar') matAutocompleteCar: MatAutocomplete;
  @ViewChild('autoPriceFrom') matAutocompletePriceFrom: MatAutocomplete;
  @ViewChild('autoPriceTo') matAutocompletePriceTo: MatAutocomplete;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.allPricesFrom = this.allPricesFrom.map((price: string) => {return price + ' CZK';});
    this.allPricesTo = this.allPricesTo.map((price: string) => {
      if (price !== 'Unlimited') {
        return price + ' CZK';
      }
      return price;
    });
    this._updateFuelObservables();
    this._updateCarObservables();
    this._updatePriceObservables();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(TinderHowToComponent);
  }

  addFuel(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    var allFuelsLower = this.allFuels.map(v => v.toLowerCase());
    var fuelsLower = this.fuels.map(v => v.toLowerCase());
    if ((value || '').trim() && allFuelsLower.includes(value.trim().toLocaleLowerCase()) && !fuelsLower.includes(value.trim().toLocaleLowerCase())) {
      this.fuels.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    if (this.fuels.length == this.allFuels.length) {
      this.fuelInputHidden = true;
    }

    this.fuelCtrl.setValue(null);
    this._updateFuelObservables();
  }

  addCar(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    var allCarsLower = this.allCars.map(v => v.toLowerCase());
    var carsLower = this.cars.map(v => v.toLowerCase());
    if ((value || '').trim() && allCarsLower.includes(value.trim().toLocaleLowerCase()) && !carsLower.includes(value.trim().toLocaleLowerCase())) {
      if (value.trim() === 'All') {
        this.cars = ['All'];
      } else {
        this.cars.push(value.trim());
        this.removeCar('All');
      }
    }

    if (input) {
      input.value = '';
    }

    if (this.cars.length == this.allCars.length) {
      this.carInputHidden = true;
    }

    this.carCtrl.setValue(null);
    this._updateCarObservables();
  }

  removeFuel(fuel: string): void {
    const index = this.fuels.indexOf(fuel);

    if (index >= 0) {
      this.fuels.splice(index, 1);
    }
    if (this.fuels.length <= 0) {
      this.fuels = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
      this.fuelInputHidden = true;
    }
    if (this.fuels.length != this.allFuels.length) {
      this.fuelInputHidden = false;
    }
    this._updateFuelObservables();
  }

  removeCar(car: string): void {
    const index = this.cars.indexOf(car);

    if (index >= 0) {
      this.cars.splice(index, 1);
    }
    if (this.cars.length <= 0) {
      this.cars = ['All'];
    }
    if (this.cars.length != this.allCars.length) {
      this.carInputHidden = false;
    }
    this._updateCarObservables();
  }

  selectedFuel(event: MatAutocompleteSelectedEvent, value?: string): void {
    if (!value) {
      value = event.option.viewValue;
    }
    var allFuelsLower = this.allFuels.map(v => v.toLowerCase());
    var fuelsLower = this.fuels.map(v => v.toLowerCase());

    if (allFuelsLower.includes(value.trim().toLocaleLowerCase()) && !fuelsLower.includes(value.trim().toLocaleLowerCase())) {
      this.fuels.push(value);
    }

    this.fuelInputHidden = this.fuels.length == this.allFuels.length;

    this.fuelInput.nativeElement.value = '';
    this.fuelCtrl.setValue(null);
    this._updateFuelObservables();
  }

  selectedCar(event: MatAutocompleteSelectedEvent, value?: string): void {
    if (!value) {
      value = event.option.viewValue;
    }
    var allCarsLower = this.allCars.map(v => v.toLowerCase());
    var carsLower = this.cars.map(v => v.toLowerCase());

    if (allCarsLower.includes(value.trim().toLocaleLowerCase()) && !carsLower.includes(value.trim().toLocaleLowerCase())) {
      if (value.trim() === 'All') {
        this.cars = ['All'];
      } else {
        this.cars.push(value.trim());
        this.removeCar('All');
      }
    }

    this.carInputHidden = this.cars.length == this.allCars.length;

    this.carInput.nativeElement.value = '';
    this.carCtrl.setValue(null);
    this._updateCarObservables();
  }

  priceChanged(): void {
    var CZKposFrom = this.priceFromValue.length - 3;
    if (this.priceFromValue.indexOf('CZK') == CZKposFrom && this.priceFromValue[CZKposFrom - 1] !== ' ' && this.priceFromValue !== '') {
      this.priceFromValue = [this.priceFromValue.slice(0, CZKposFrom), ' ', this.priceFromValue.slice(CZKposFrom)].join('');
    } else if (this.priceFromValue.indexOf(' CZK') != this.priceFromValue.length - 4 && this.priceFromValue !== '') {
      this.priceFromValue += ' CZK';
    }

    var CZKposTo = this.priceToValue.length - 3;
    if (this.priceToValue.indexOf('CZK') == CZKposTo && this.priceToValue[CZKposTo - 1] !== ' ' && this.priceToValue !== '') {
      this.priceToValue = [this.priceToValue.slice(0, CZKposTo), ' ', this.priceToValue.slice(CZKposTo)].join('');
    } else if (this.priceToValue.indexOf(' CZK') != this.priceToValue.length - 4 && this.priceToValue !== 'Unlimited' && this.priceToValue !== '') {
      this.priceToValue += ' CZK';
    }

    this._checkPrices();
  }

  formatSliderLabel(value: number) {
    if (value == 0) {
      return 'new';
    }
    if (value >= 24 && value < 120) {
      if (value % 12 == 0) {
        return (value / 12) + 'yr';
      }
      return (value / 12).toFixed(1) + 'yr';
    }
    if (value >= 120) {
      return Math.round(value / 12) + 'yr+';
    }

    return value + 'mo';
  }

  optionClickedFuel(event: Event, fuel: string) {
    event.stopPropagation();
    this.selectedFuel(null, fuel);
  }

  optionClickedCar(event: Event, car: string) {
    event.stopPropagation();
    this.selectedCar(null, car);
  }

  private _checkPrices() {
    var fromVal = this._checkFromPrice();
    var toVal = this._checkToPrice();
    if (fromVal && toVal) {
      priceDiffError = fromVal > toVal;
    }
    
    this.priceDiffErrorC = priceDiffError;
    this.priceFromErrorC = priceFromError;
    this.priceToErrorC = priceToError;

    if (this.priceFromValue == "") {
      this.priceFromErrorC = false;
      priceFromError = false;
    }
    if (this.priceToValue == "") {
      this.priceToErrorC = false;
      priceToError = false;
    }
  }

  private _checkFromPrice() {
    if (this.priceFromValue.indexOf(' CZK') != this.priceFromValue.length - 4) {
      priceFromError = true;
      return null;
    }
    var val = this.priceFromValue.slice(0, this.priceFromValue.length - 4);
    if (!/^\+?(0|[1-9]\d*)$/.test(val)) {
      priceFromError = true;
      return null;
    }    
    priceFromError = false;
    return Number(val);
  }

  private _checkToPrice() {
    if (this.priceToValue == 'Unlimited') {
      priceToError = false;
      return 99999999999;
    }
    if (this.priceToValue.indexOf(' CZK') != this.priceToValue.length - 4) {
      priceToError = true;
      return null;
    }
    var val = this.priceToValue.slice(0, this.priceToValue.length - 4);
    if (!/^\+?(0|[1-9]\d*)$/.test(val)) {
      priceToError = true;
      return null;
    }    
    priceToError = false;
    return Number(val);
  }

  private _updateFuelObservables() {    
    this.filteredFuels = this.fuelCtrl.valueChanges.pipe(
      startWith(''),
      map((fuel: string | null) => fuel ? this._filterFuel(fuel) : this.allFuels.filter(fuel => !this.fuels.map(v => v.toLowerCase()).includes(fuel.toLowerCase())).slice()));
  }

  private _updateCarObservables() {
    this.filteredCars = this.carCtrl.valueChanges.pipe(
      startWith(''),
      map((car: string | null) => car ? this._filterCar(car) : this.allCars.filter(car => !this.cars.map(v => v.toLowerCase()).includes(car.toLowerCase())).slice()));
  }

  private _updatePriceObservables() {
    this.filteredPriceFrom = this.priceFromCtrl.valueChanges.pipe(
      startWith(''),
      map((price: string | null) => price ? this._filterPriceFrom(price) : this.allPricesFrom.slice()));

    this.filteredPriceTo = this.priceToCtrl.valueChanges.pipe(
      startWith(''),
      map((price: string | null) => price ? this._filterPriceTo(price) : this.allPricesTo.slice()));
  }

  private _filterFuel(value: string): string[] {
    const filterValue = value.toLowerCase();
    var fuelsLower = this.fuels.map(v => v.toLowerCase());

    return this.allFuels.filter(fuel => fuel.toLowerCase().indexOf(filterValue) === 0 && !fuelsLower.includes(fuel.toLocaleLowerCase()));
  }

  private _filterCar(value: string): string[] {
    const filterValue = value.toLowerCase();
    var carsLower = this.cars.map(v => v.toLowerCase());

    return this.allCars.filter(car => car.toLowerCase().indexOf(filterValue) === 0 && !carsLower.includes(car.toLocaleLowerCase()));
  }

  private _filterPriceFrom(name: string): string[] {
    const filterValue = name.toLowerCase();
    var result = this.allPricesFrom.filter(price => price.toLowerCase().indexOf(filterValue) === 0);
    if (result.length == 0) {
      return this.allPricesFrom.filter(price => price.toLowerCase()[0] === filterValue[0]);
    }

    return result;
  }

  private _filterPriceTo(name: string): string[] {
    const filterValue = name.toLowerCase();
    var result = this.allPricesTo.filter(price => price.toLowerCase().indexOf(filterValue) === 0 || price === 'Unlimited');
    if (result.length == 1) {
      return this.allPricesTo.filter(price => price.toLowerCase()[0] === filterValue[0] || price === 'Unlimited');
    }

    return result;
  }
}