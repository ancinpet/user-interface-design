import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderResultPageComponent } from './tinder-result-page.component';

describe('TinderResultPageComponent', () => {
  let component: TinderResultPageComponent;
  let fixture: ComponentFixture<TinderResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinderResultPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
