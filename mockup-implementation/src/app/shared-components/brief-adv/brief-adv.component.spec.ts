import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefAdvComponent } from './brief-adv.component';

describe('BriefAdvComponent', () => {
  let component: BriefAdvComponent;
  let fixture: ComponentFixture<BriefAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefAdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
