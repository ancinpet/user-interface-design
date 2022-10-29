import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdsPageComponent } from './users-ads-page.component';

describe('UsersAdsPageComponent', () => {
  let component: UsersAdsPageComponent;
  let fixture: ComponentFixture<UsersAdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
