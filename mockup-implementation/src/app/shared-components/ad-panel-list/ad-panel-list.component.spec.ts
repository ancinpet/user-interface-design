import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPanelListComponent } from './ad-panel-list.component';

describe('AdPanelListComponent', () => {
  let component: AdPanelListComponent;
  let fixture: ComponentFixture<AdPanelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdPanelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
