import { TestBed } from '@angular/core/testing';

import { AdminQuoteManagerTableService } from './admin-quote-manager-table.service';

describe('AdminQuoteManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminQuoteManagerTableService = TestBed.get(AdminQuoteManagerTableService);
    expect(service).toBeTruthy();
  });
});
