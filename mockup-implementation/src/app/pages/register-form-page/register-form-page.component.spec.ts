import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormPageComponent } from './register-form-page.component';

describe('RegisterFormPageComponent', () => {
  let component: RegisterFormPageComponent;
  let fixture: ComponentFixture<RegisterFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
