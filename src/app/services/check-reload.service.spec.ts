import { TestBed } from '@angular/core/testing';

import { CheckReloadService } from './check-reload.service';

describe('CheckReloadService', () => {
  let service: CheckReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
