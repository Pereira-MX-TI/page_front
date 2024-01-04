import { TestBed } from '@angular/core/testing';

import { ViewServiceGuard } from './view-service.guard';

describe('ViewServiceGuard', () => {
  let guard: ViewServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
