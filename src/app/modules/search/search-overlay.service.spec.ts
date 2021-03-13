import { TestBed } from '@angular/core/testing';

import { SearchOverlayService } from './search-overlay.service';

describe('SearchOverlayService', () => {
  let service: SearchOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
