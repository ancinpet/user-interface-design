import { TestBed } from '@angular/core/testing';

import { NotAuthenticatedUserGuardService } from './not-authenticated-guard.service';

describe('NotAuthenticatedGuardService', () => {
  let service: NotAuthenticatedUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotAuthenticatedUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
