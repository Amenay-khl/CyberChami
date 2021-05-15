import { TestBed } from '@angular/core/testing';

import { ChamisService } from './chamis.service';

describe('ChamisService', () => {
  let service: ChamisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
