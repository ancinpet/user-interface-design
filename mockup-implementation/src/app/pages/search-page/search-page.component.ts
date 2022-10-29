import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup = new FormGroup({
    brand: new FormControl(''),
    model: new FormControl(''),
    engine: new FormControl(''),
    gearbox: new FormControl(''),
    priceFrom: new FormControl(''),
    priceTo: new FormControl(''),
    mileageFrom: new FormControl(''),
    mileageTo: new FormControl(''),
  });

  brands = ['BMW', 'Audi', 'Skoda', 'Volkswagen'];
  models = ['328', 'A5', 'Octavia', 'Fabia', 'Yeti', 'Golf', 'A3', 'S3'];
  engines = ['b60', '1.0 tsi', '1.9 tdi'];
  gearboxes = ['manual', 'automatic'];
  mileages = ['10.000', '50.000', '100.000', '200.000', '300.000', '400.000'];
  prices = ['100.000CZK', '300.000CZK', '500.000CZK', '1.000.000CZK', '2.000.000CZK', '3.000.000CZK', '5.000.000CZK'];

  @ViewChild('searchFormDirective') searchFormDirective: FormGroupDirective;

  private redirect = false;

  constructor(private router: Router, private searchHistory: SearchHistoryService) { }

  ngOnInit(): void {

    if (this.searchHistory.shouldLoadFromHistory === 0) {
      const history = this.searchHistory.getSearchHistory();
      this.searchForm.setValue(history[history.length - 1].params);
      return;
    }

    if (this.searchHistory.shouldLoadFromHistory > 0) {
      this.searchForm.setValue(this.searchHistory.getParamsFromHistory(this.searchHistory.shouldLoadFromHistory));
      this.redirect = true;
      return;
    }
  }

  ngAfterViewInit(): void {
    if (this.redirect) {
      this.redirect = false;
      this.searchFormDirective.ngSubmit.emit();
    }
  }

  onClick(): void {
    this.searchHistory.addToHistory(this.searchForm.value);
    const mileageFrom = this.searchForm.controls.mileageFrom.value;
    const mileageTo = this.searchForm.controls.mileageTo.value;
    const priceFrom = this.searchForm.controls.priceFrom.value;
    const priceTo = this.searchForm.controls.priceTo.value;

    const brandQuery = this.searchForm.controls.brand.value.trim() !== '' ? {brand: this.searchForm.controls.brand.value} : null;
    const modelQuery = this.searchForm.controls.model.value.trim() !== '' ? {model: this.searchForm.controls.model.value} : null;
    const engineQuery = this.searchForm.controls.engine.value.trim() !== '' ? {engine: this.searchForm.controls.engine.value} : null;
    const gearboxQuery = this.searchForm.controls.gearbox.value.trim() !== '' ? {gearbox: this.searchForm.controls.gearbox.value} : null;
    const priceFromQuery = this.searchForm.controls.priceFrom.value !== '' ? {priceFrom} : null;
    const priceToQuery = this.searchForm.controls.priceTo.value !== '' ? {priceTo} : null;
    const mileageFromQuery = this.searchForm.controls.mileageFrom.value !== '' ? { mileageFrom } : null;
    const mileageToQuery = this.searchForm.controls.mileageTo.value !== '' ? { mileageTo } : null;

    // console.log('Brand query: ', brandQuery);
    this.router.navigate(['/search-result'],
      { queryParams: {
        ...brandQuery, ...modelQuery, ...engineQuery, ...gearboxQuery, ...priceFromQuery,
          ...priceToQuery, ...mileageFromQuery, ...mileageToQuery
      }});
  }
}
