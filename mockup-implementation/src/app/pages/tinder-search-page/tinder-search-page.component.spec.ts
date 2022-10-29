import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderSearchPageComponent } from './tinder-search-page.component';

describe('TinderSearchPageComponent', () => {
  let component: TinderSearchPageComponent;
  let fixture: ComponentFixture<TinderSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinderSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
