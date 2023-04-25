import { TestBed } from '@angular/core/testing';

import { ApiChoroplethService } from './api-choropleth.service';

describe('ApiChoroplethService', () => {
  let service: ApiChoroplethService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiChoroplethService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
