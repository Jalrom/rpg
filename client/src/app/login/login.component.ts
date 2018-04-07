import { ServerError } from './../serverError.interface';
import ROUTES from './../routes';
import { Router } from '@angular/router';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formErrors = {
    'username': '',
    'password': '',
    'server': ''
  };

  validationMessages = {
    'username': {
      'required':      'Username required.'
    },
    'password': {
      'required':      'Password required.'
    }
  };

  private loginForm: FormGroup;
  private user: User;
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.user = new User();
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: [this.user.username, [
          Validators.required]],
      password: [this.user.password, [
            Validators.required]]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      const control = form.get(field);
      this.formErrors[field] = '';
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  login() {
    // this.appService.loading = true;
    this.loginService.login(this.user).subscribe(
      (res) => {
          console.log(res);
          // res contains the id of the user
          this.router.navigate(['/' + ROUTES.GAME]);
      },
      (err) => {
          const serverError: ServerError = err.json();
          if (serverError.message.includes('Username')) {
            this.formErrors.username = serverError.message;
          } else if (serverError.message.includes('password')) {
            this.formErrors.password = serverError.message;
          }
      }
    );
  }

  signup() {
    this.router.navigate(['/' + ROUTES.REGISTER]);
  }
}
