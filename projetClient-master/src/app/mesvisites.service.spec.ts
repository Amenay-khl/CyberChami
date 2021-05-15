import { TestBed } from '@angular/core/testing';

import { MesvisitesService } from './mesvisites.service';

describe('MesvisitesService', () => {
  let service: MesvisitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesvisitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
