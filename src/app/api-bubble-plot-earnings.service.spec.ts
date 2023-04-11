import { TestBed } from '@angular/core/testing';

import { ApiBubblePlotEarningsService } from './api-bubble-plot-earnings.service';

describe('ApiBubblePlotEarningsService', () => {
  let service: ApiBubblePlotEarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBubblePlotEarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
