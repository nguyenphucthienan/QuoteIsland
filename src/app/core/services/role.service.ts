import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Role } from '../models/role.interface';

@Injectable()
export class RoleService {

  private readonly roleUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.roleUrl}`);
  }

}
