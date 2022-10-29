import { TestBed } from '@angular/core/testing';

import { AuthenticatedUserGuardService } from './authenticated-guard.service';

describe('AuthenticatedGuardService', () => {
  let service: AuthenticatedUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatedUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
