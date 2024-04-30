import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-company',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatCardContent,
        ReactiveFormsModule
    ],
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss',
})
export class CompanyComponent {

    loginForm!: FormGroup;
    submitted = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router
    ) {}
    formularioLogin = this.fb.group({
        Nombre: ['', [Validators.required]],
    });
    onSubmit()
        {
            console.log(this.formularioLogin);
        }
}
