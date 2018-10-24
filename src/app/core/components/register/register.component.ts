import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.registerPage;

  registerForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.alertService.success('Register successfully');
          this.authService.login(this.registerForm.value)
            .subscribe(() => {
              this.router.navigate(['/']);
            });
        },
        error => this.alertService.error('Register failed')
      );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { 'passwordMatch': true };
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.registerForm.get(controlName).touched
      && this.registerForm.get(controlName).hasError(errorName);
  }

}
