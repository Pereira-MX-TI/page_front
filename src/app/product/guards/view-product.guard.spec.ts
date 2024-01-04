import { TestBed } from '@angular/core/testing';

import { ViewProductGuard } from './view-product.guard';

describe('ViewProductGuard', () => {
  let guard: ViewProductGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewProductGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
