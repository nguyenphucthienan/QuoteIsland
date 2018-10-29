import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly bannerImageUrl = environment.bannerImageUrls.loginPage;

  loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.alertService.success('Login successfully');
          this.router.navigate(['/']);
        },
        error => this.alertService.error('Login failed')
      );
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName).touched
      && this.loginForm.get(controlName).hasError(errorName);
  }

}
