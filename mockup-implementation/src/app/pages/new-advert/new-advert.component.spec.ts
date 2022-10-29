import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvertComponent } from './new-advert.component';

describe('NewAdvertComponent', () => {
  let component: NewAdvertComponent;
  let fixture: ComponentFixture<NewAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
