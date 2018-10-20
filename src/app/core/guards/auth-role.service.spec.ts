import { TestBed } from '@angular/core/testing';

import { AuthRoleService } from './auth-role.service';

describe('AuthRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRoleService = TestBed.get(AuthRoleService);
    expect(service).toBeTruthy();
  });
});
