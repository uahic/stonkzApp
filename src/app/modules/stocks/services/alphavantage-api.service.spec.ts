import { TestBed } from '@angular/core/testing';

import { AlphavantageAPIService } from './alphavantage-api.service';

describe('AlphavantageAPIService', () => {
  let service: AlphavantageAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphavantageAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
