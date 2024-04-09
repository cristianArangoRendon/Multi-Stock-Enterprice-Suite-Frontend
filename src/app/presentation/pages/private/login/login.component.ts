import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { loginUserCase } from 'src/app/infrastructure/user-cases/loginUserCase';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    loginForm!: FormGroup;
    submitted = false;
    constructor(
        private fb: FormBuilder,
        private ls: loginUserCase,
        private _router: Router
    ) {}
    formularioLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    onSubmit() {
        if (this.formularioLogin.valid) {
            this.ls.auth(this.formularioLogin.value).subscribe((success) => {
                if (success) {
                    this._router.navigate(['/dashboard']);
                }
            });
        }
    }
}
