import { TestBed } from '@angular/core/testing';

import { FilterLocationValueService } from './filter-location-value.service';

describe('FilterLocationValueService', () => {
  let service: FilterLocationValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterLocationValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
