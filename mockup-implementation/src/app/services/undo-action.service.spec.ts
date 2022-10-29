import { TestBed } from '@angular/core/testing';

import { UndoActionService } from './undo-action.service';

describe('UndoActionService', () => {
  let service: UndoActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UndoActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
