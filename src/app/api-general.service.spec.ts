import { TestBed } from '@angular/core/testing';

import { ApiGeneralService } from './api-general.service';

describe('ApiGeneralService', () => {
  let service: ApiGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
