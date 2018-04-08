import { ServerError } from './../serverError.interface';
import ROUTES from './../routes';
import { Router } from '@angular/router';
import { PlayerGlobal } from './../player.global';
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
  constructor(private fb: FormBuilder, private router: Router,
                private loginService: LoginService, private player: PlayerGlobal) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: [this.player.username, [
          Validators.required]],
      password: [this.player.password, [
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
    this.loginService.login(this.player).subscribe(
      (res) => {
          this.player.skills = res.skills;
          this.player.id = res.id;
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
