import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdvComponent } from './detail-adv.component';

describe('DetailAdvComponent', () => {
  let component: DetailAdvComponent;
  let fixture: ComponentFixture<DetailAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
