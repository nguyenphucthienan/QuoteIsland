import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models/role.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-user-add-modal',
  templateUrl: './admin-user-add-modal.component.html',
  styleUrls: ['./admin-user-add-modal.component.scss']
})
export class AdminUserAddModalComponent implements OnInit {

  @Output() userAdded = new EventEmitter();

  addForm: FormGroup;
  roles: Role[] = [];

  constructor(private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      username: [null, Validators.required],
      roles: [[], Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });

    this.roleService.getRoles()
      .subscribe((roles: Role[]) => this.roles = roles);
  }

  photoUploaded(response) {
    this.addForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  addUser() {
    this.userService.createUser(this.addForm.value)
      .subscribe(
        (user: User) => {
          this.alertService.success('Add user successfully');
          this.userAdded.emit(user);
        },
        error => this.alertService.error('Add user failed')
      );
  }

}
