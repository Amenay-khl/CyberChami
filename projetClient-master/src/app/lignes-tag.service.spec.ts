import { TestBed } from '@angular/core/testing';

import { LignesTAGService } from './lignes-tag.service';

describe('LignesTAGService', () => {
  let service: LignesTAGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignesTAGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
