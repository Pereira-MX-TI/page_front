import { TestBed } from '@angular/core/testing';

import { ShareInformationService } from './share-information.service';

describe('ShareInformationService', () => {
  let service: ShareInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
