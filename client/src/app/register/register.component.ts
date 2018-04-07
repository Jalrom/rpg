import { ROUTES } from './../routes';
import { AppService } from './../app.service';
import { RegisterService } from './register.service';
import { passwordMatcher } from './passwordMatcher';
import { User } from './../user';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formErrors = {
    'username': '',
    'name': '',
    'email': '',
    'passwords': {
      'password': '',
      'passwordConfirm': ''
    }
  };

  validationMessages = {
    'username': {
      'required':      'Username required.',
      'minlength':     'Username must be at least 2 characters long.',
      'maxlength':     'Username can\'t exceed 16 characters.',
      'pattern':       'Invalid username.'
    },
    'name': {
      'required':      'Name required.',
      'maxlength':     'Name can\'t exceed 32 characters.',
      'pattern':       'Invalid name.'
    },
    'email': {
      'required':      'Email required.',
      'maxlength':     'Email can\'t exceed 254 characters.',
      'email':         'Invalid email.'
    },
    'password': {
      'required':      'Password required.',
      'maxlength':     'Password can\'t exceed 64 characters.',
      'minlength':     'Password must contain at least 8 characters.',
      'pattern':       'Password must contain at least one lowercase character, one uppercase character and a special character.'
    },
    'passwordConfirm': {
      'required': 'Password confirmation required.',
      'noMatch':  'Passwords must match.'
    }
  };

  private registerForm: FormGroup;
  private user: User;
  private passwordConfirm: string;
  private errorMessage: string;
  private registerOk: boolean;
  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService, private appService: AppService) { }

  ngOnInit() {
    this.appService.loginPage = false;
    localStorage['loggedIn'] = false;
    this.user = new User();
    this.passwordConfirm = '';
    this.temp();
    this.errorMessage = '';
    this.registerOk = true;
    this.buildForm();
  }

private temp() {
        this.user.username = 'Jeiji';
    this.user.email = 'tes@h';
    this.user.name = 'Jean';
    this.user.password = 'Jean1234';
    this.passwordConfirm = 'Jean1234';
}
buildForm(): void {
    this.registerForm = this.fb.group({
      username: [this.user.username, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(16),
          Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]],
      name: [this.user.name, [
          Validators.required,
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z0-9_.-]+(\s?[a-zA-Z0-9_.-]+)*$/)]],
      email: [this.user.email, [
          Validators.required,
          Validators.maxLength(254),
          Validators.email]],
      passwords: this.fb.group({
        password: [this.user.password, [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
            Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)]],
        passwordConfirm: [this.passwordConfirm, [
            Validators.required
            ]]},
          { validator : passwordMatcher})
    });
    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.formErrors) {
      // check if the field corresponds a formgroup (controls is present)
      if ((form.get(field) as any).controls ) {
        // if yes, iterate the inner formfields
        for (const subfield in (form.get(field) as FormGroup).controls) {
          // in this example corresponds = "child", reset the error messages
          this.formErrors[field][subfield] = '';
          // now access the actual formfield
          const control = (form.get(field) as FormGroup).controls[subfield];
          // validate and show appropriate error message
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[subfield];
            for (const key in control.errors) {
              this.formErrors[field][subfield] += messages[key] + ' ';
            }
          }
        }
      } else { // does not contain a nested formgroup, so just iterate like before making changes to this method
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
  }


  public register(): void {
    this.appService.loading = true;
    this.registerService.register(this.user).subscribe(
      res => {
        console.log(res);
        this.registerOk = true;
        this.appService.loading = false;
        // this.appService.id = res;
        // localStorage['loggedIn'] = JSON.stringify(true);
        // localStorage['id'] = JSON.stringify(res);
        // res is the id of the user
        this.router.navigate(['/' + ROUTES.GAME, res]);
      },
      err => {
          console.log(err);
        this.registerOk = false;
        // this.formErrors.username = err.json();
        this.appService.loading = false;
      }
    );
  }
}
