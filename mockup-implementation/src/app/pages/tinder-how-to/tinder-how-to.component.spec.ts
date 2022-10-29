import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderHowToComponent } from './tinder-how-to.component';

describe('TinderHowToComponent', () => {
  let component: TinderHowToComponent;
  let fixture: ComponentFixture<TinderHowToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinderHowToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinderHowToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
