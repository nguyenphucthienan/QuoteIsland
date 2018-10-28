import { TestBed } from '@angular/core/testing';

import { AdminCategoryManagerTableService } from './admin-category-manager-table.service';

describe('AdminCategoryManagerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCategoryManagerTableService = TestBed.get(AdminCategoryManagerTableService);
    expect(service).toBeTruthy();
  });
});
