import { TestBed } from '@angular/core/testing';

import { AdminUserManagerTableService } from './admin-user-manager-table.service';

describe('AdminUserManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserManagerTableService = TestBed.get(AdminUserManagerTableService);
    expect(service).toBeTruthy();
  });
});
