import { TestBed } from '@angular/core/testing';

import { DefisService } from './defis.service';

describe('DefisService', () => {
  let service: DefisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
