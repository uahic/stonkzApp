import { TestBed } from '@angular/core/testing';

import { FinnhubAPIService } from './finnhub-api.service';

describe('FinnhubAPIService', () => {
  let service: FinnhubAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnhubAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
