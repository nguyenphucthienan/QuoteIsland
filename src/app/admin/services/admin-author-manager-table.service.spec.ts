import { TestBed } from '@angular/core/testing';

import { AdminAuthorManagerTableService } from './admin-author-manager-table.service';

describe('AdminAuthorManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthorManagerTableService = TestBed.get(AdminAuthorManagerTableService);
    expect(service).toBeTruthy();
  });
});
