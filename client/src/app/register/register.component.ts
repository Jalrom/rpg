import { StatsService } from 'app/stats/stats.service';
import { ServerError } from './../serverError.interface';
import ROUTES from './../routes';
import { AppService } from './../app.service';
import { RegisterService } from './register.service';
import { passwordMatcher } from './passwordMatcher';
import { PlayerGlobal } from './../player.global';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    private formErrors = {
        'username': '',
        'name': '',
        'email': '',
        'passwords': {
            'password': '',
            'passwordConfirm': ''
        }
    };

    private validationMessages = {
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
    private passwordConfirm: string;
    constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService,
                private appService: AppService, private player: PlayerGlobal, private statsService: StatsService) { }

    public ngOnInit(): void {
        this.appService.loginPage = false;
        this.passwordConfirm = '';
        this.buildForm();
    }

    private buildForm(): void {
        this.registerForm = this.fb.group({
            username: [this.player.username, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(16),
                Validators.pattern(/^[a-zA-Z0-9_.-]*$/)]],
            name: [this.player.name, [
                Validators.required,
                Validators.maxLength(32),
                Validators.pattern(/^[a-zA-Z0-9_.-]+(\s?[a-zA-Z0-9_.-]+)*$/)]],
            email: [this.player.email, [
                Validators.required,
                Validators.maxLength(254),
                Validators.email]],
            passwords: this.fb.group({
                password: [this.player.password, [
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

    private onValueChanged(data?: any): void {
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
        this.registerService.register(this.player).subscribe(
            (id: number) => {
                this.appService.loading = false;
                this.statsService.createSkill(id).subscribe(() => {
                    this.router.navigate(['/' + ROUTES.LOGIN]);
                });
            },
            (err) => {
                const serverError: ServerError = err.json();
                // TODO: Find a better way to display email or username already used
                if (serverError.message.includes('Email')) {
                    this.formErrors.email = serverError.message;
                } else if (serverError.message.includes('Username')) {
                    this.formErrors.username = serverError.message;
                }
                this.appService.loading = false;
            }
        );
    }
}
