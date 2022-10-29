import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteAdsPageComponent } from './favourite-ads-page.component';

describe('FavouriteAdsPageComponent', () => {
  let component: FavouriteAdsPageComponent;
  let fixture: ComponentFixture<FavouriteAdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAdsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteAdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
