import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { TableRow } from 'src/app/datatable/models/table-row.interface';

@Component({
  selector: 'app-admin-user-edit-modal',
  templateUrl: './admin-user-edit-modal.component.html',
  styleUrls: ['./admin-user-edit-modal.component.scss']
})
export class AdminUserEditModalComponent implements OnInit {

  @Input() rowData: TableRow;
  @Output() userEdited = new EventEmitter();

  editForm: FormGroup;
  roles: Role[] = [];

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      username: [
        this.rowData.cells['username'].value
        , [Validators.required, Validators.minLength(4)]
      ],
      roles: [
        this.rowData.cells['roles'].value.map(role => role._id),
        Validators.required
      ],
      firstName: [
        this.rowData.cells['firstName'].value,
        Validators.required
      ],
      lastName: [
        this.rowData.cells['lastName'].value,
        Validators.required
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      photoUrl: [
        this.rowData.cells['photoUrl'] && this.rowData.cells['photoUrl'].value,
        Validators.required
      ]
    }, { validator: [this.passwordMatchValidator] });

    this.roleService.getRoles()
      .subscribe((roles: Role[]) => this.roles = roles);
  }

  photoUploaded(response) {
    this.editForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  editUser() {
    this.userService.editUser(this.rowData.cells['_id'].value,
      this.editForm.value)
      .subscribe(
        (user: User) => {
          this.alertService.success('Add user successfully');
          this.userEdited.emit(user);
        },
        error => this.alertService.error('Add user failed')
      );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { 'passwordMatch': true };
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.editForm.get(controlName).touched
      && this.editForm.get(controlName).hasError(errorName);
  }

}
