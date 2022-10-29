import { Injectable } from '@angular/core';
import { Advertisment } from '../model/advertisment';

// tslint:disable: max-line-length

@Injectable({
  providedIn: 'root'
})
export class AdvertismentService {

  private allAdverts: Advertisment[];

  private currentAdvert: Advertisment;
  private currentTinderAdvert: Advertisment;

  constructor() {
    this.fillAdverts();
    this.currentTinderAdvert = this.allAdverts[0];
  }

  private fillAdverts(): void {
    this.allAdverts = [
      new Advertisment(0, 1, [...new Array(10)].map((_,i) => '/assets/1-' + (i + 1) + '.jpg'), 'Skoda', 'Superb', '390 000 CZK',  [['Mileage', '131 118 km'], ['Manufactured', '2016'], ['Engine', '140 kW, Gasoline, Automatic'], ['Fuel type', 'Gasoline'], ['Fuel usage', '4.6 litres']],  ['ABS', 'Airbag x6', 'Rear camera']),
      new Advertisment(1, 1, [...new Array(8)].map((_,i) => '/assets/2-' + (i + 1) + '.jpg'), 'Volkswagen', 'Touareg', '1 400 000 CZK', [['Mileage', '23 964 km'], ['Manufactured', '2019'], ['Engine', '170 kW, Diesel, Automatic, 4x4'], ['Fuel type', 'Diesel'], ['Fuel usage', '5.7 litres']],  ['ABS', 'Airbag x6', 'Rear camera']),
      new Advertisment(2, 1, [...new Array(7)].map((_,i) => '/assets/3-' + (i + 1) + '.jpg'), 'Audi', 'S3', '700 000 CZK', [['Mileage', '88 530 km'], ['Manufactured', '2017'], ['Engine', '228 kW, Gasoline, 6 - speed, 4x4'], ['Fuel type', 'Gasoline'], ['Fuel usage', '6.3 litres']],  ['ABS', 'Airbag x6', 'Rear camera']),
    ];
    for (let i = 0; i < 8; ++i) {
        let carID = Math.floor(Math.random() * 3) + 1;
        this.allAdverts.push(new Advertisment(
          3 + i,
          (i % 5) + 1,
          [...new Array(10 - carID)].map((_,i) => '/assets/' + carID + '-' + (i + 1) + '.jpg'),
           'Car#' + i,
           'Model 50' + i,
          (Math.floor(Math.random() * (1200000 - 50000 + 1)) + 50000) + ' CZK',
          [
            ['Mileage', (Math.floor(Math.random() * (45000 - 100 + 1)) + 100) + ' km'],
            ['Manufactured', (Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010) + ''],
            ['Engine', (Math.floor(Math.random() * (250 - 100 + 1)) + 100) + ' kW, Diesel, Automatic'],
            ['Fuel type', 'Gasoline'], ['Fuel usage', ((Math.floor(Math.random() * (120 - 40 + 1)) + 40) / 10.0) + ' litres']
          ],
          ['ABS', 'Airbag x6', 'Rear camera']));
    }

    this.allAdverts.push(new Advertisment(12, 5, ['/assets/fabia-3.jpg', '/assets/fabia-2.jpg', '/assets/fabia-1.jpg'], 'Skoda', 'Fabia', '250 000 CZK',  [['Mileage', '256 000 km'], ['Manufactured', '2011'], ['Engine', '47 kW, Gasoline, 5 - speed'], ['Fuel type', 'Gasoline'], ['Fuel usage', '5.9 litres']],  ['ABS', 'Radio']));
    this.allAdverts.push(new Advertisment(18, 1, ['/assets/yeti-1.jpg', '/assets/yeti-2.jpg'], 'Skoda', 'Yeti', '600 000 CZK', [['Mileage', '189 345 km'], ['Manufactured', '2016'], ['Engine', '127 kW, Gasoline, Automatic, 4x4'], ['Fuel type', 'Gasoline'], ['Fuel usage', '7.2 litres']],  ['ABS', 'AC']));
    this.allAdverts.push(new Advertisment(13, 4, ['/assets/fabia-1.jpg', '/assets/fabia-2.jpg', '/assets/fabia-4.jpg'], 'Skoda', 'Fabia', '275 000 CZK',  [['Mileage', '220 238 km'], ['Manufactured', '2012'], ['Engine', '67 kW, Gasoline, 5 - speed'], ['Fuel type', 'Gasoline'], ['Fuel usage', '5.1 litres']],  ['ABS', 'Airbag', 'AC']));
    this.allAdverts.push(new Advertisment(14, 1, ['/assets/golf-1.jpg', '/assets/golf-2.jpg', '/assets/golf-3.jpg', '/assets/golf-4.jpg'], 'Volkswagen', 'Golf', '750 000 CZK', [['Mileage', '120 500 km'], ['Manufactured', '2017'], ['Engine', '170 kW, Gasoline, Automatic'], ['Fuel type', 'Gasoline'], ['Fuel usage', '6 litres']],  ['ABS', 'Airbag', 'Rear camera', 'AC']));
    this.allAdverts.push(new Advertisment(16, 3, ['/assets/a3-1.jpg', '/assets/a3-2.jpg', '/assets/a3-3.jpg'], 'Audi', 'A3', '1 100 000 CZK', [['Mileage', '35 530 km'], ['Manufactured', '2019'], ['Engine', '228 kW, Diesel, Automatic'], ['Fuel type', 'Diesel'], ['Fuel usage', '6.3 litres']],  ['ABS', 'Airbag x6', 'Rear camera', 'GPS']));
    this.allAdverts.push(new Advertisment(19, 2, ['/assets/yeti-2.jpg', '/assets/yeti-1.jpg'], 'Skoda', 'Yeti', '450 000 CZK', [['Mileage', '147 345 km'], ['Manufactured', '2016'], ['Engine', '97 kW, Gasoline, 6 - speed, 4x4'], ['Fuel type', 'Gasoline'], ['Fuel usage', '6.8 litres']],  ['ABS', 'AC', 'Radio']));
    this.allAdverts.push(new Advertisment(11, 1, ['/assets/fabia-2.jpg', '/assets/fabia-1.jpg', '/assets/fabia-3.jpg', '/assets/fabia-4.jpg'], 'Skoda', 'Fabia', '350 000 CZK',  [['Mileage', '189 118 km'], ['Manufactured', '2014'], ['Engine', '67 kW, Gasoline, Automatic'], ['Fuel type', 'Gasoline'], ['Fuel usage', '5.6 litres']],  ['ABS', 'Airbag x6', 'AC']));
    this.allAdverts.push(new Advertisment(17, 5, ['/assets/a3-2.jpg', '/assets/a3-1.jpg'], 'Audi', 'A3', '900 000 CZK', [['Mileage', '134 530 km'], ['Manufactured', '2017'], ['Engine', '228 kW, Diesel, Automatic'], ['Fuel type', 'Diesel'], ['Fuel usage', '6.7 litres']],  ['ABS', 'Airbag x6', 'Rear camera']));
    this.allAdverts.push(new Advertisment(15, 2, ['/assets/golf-2.jpg', '/assets/golf-1.jpg', '/assets/golf-3.jpg'], 'Volkswagen', 'Golf', '660 000 CZK', [['Mileage', '190 500 km'], ['Manufactured', '2015'], ['Engine', '170 kW, Gasoline, 6 - speed'], ['Fuel type', 'Gasoline'], ['Fuel usage', '5.5 litres']],  ['ABS', 'Airbag', 'AC']));
    this.allAdverts.push(new Advertisment(20, 4, ['/assets/yeti-1.jpg', '/assets/yeti-2.jpg', '/assets/yeti-3.jpg'], 'Skoda', 'Yeti', '300 000 CZK', [['Mileage', '247 000 km'], ['Manufactured', '2016'], ['Engine', '47 kW, Gasoline, 5 - speed'], ['Fuel type', 'Gasoline'], ['Fuel usage', '5 litres']],  ['ABS', 'AC', 'GPS']));
  }

  public getAllAdverts(): Advertisment[] {
    return this.allAdverts;
  }

  public getAdvertById(id: number): Advertisment {
    return this.allAdverts.find(ad => ad.id === id);
  }

  public removeAdvert(id: number): void {
    this.allAdverts = this.allAdverts.filter(ad => ad.id !== id);
  }

  public addAdvert(ad: Advertisment): void {
    this.allAdverts.push(ad);
  }

  public setCurrentAdv(ad: Advertisment): void {
    this.currentAdvert = ad;
  }
  public getCurrentAdv(): Advertisment {
    return this.currentAdvert;
  }

  public setCurrentTinder(ad: Advertisment): void {
    this.currentTinderAdvert = ad;
  }
  public getCurrentTinder(): Advertisment {
    return this.currentTinderAdvert;
  }
}
