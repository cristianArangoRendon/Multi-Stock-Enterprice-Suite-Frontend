import { LoginService } from '../../services/LoginService/LoginService';
import { ResponseDTO } from 'src/app/core/DTOs/ResponseDTO';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({providedIn: "root"})
export class loginUserCase {
    constructor(private _loginService: LoginService) {}
    auth(data: object): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this._loginService.auth(data).subscribe((response: ResponseDTO) => {
                    if (response.isSuccess) {
                        const authToken = response.data;
                        localStorage.setItem('authToken', authToken);
                        observer.next(true);
                        observer.complete();
                    } else {
                        observer.next(false);
                    }
                });
        });
    }

    isLoggedIn(): Observable<boolean> {
        const authToken = localStorage.getItem('authToken');
        return of(!!authToken);
    }

    logout(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            localStorage.removeItem('authToken');
            observer.next(true);
            observer.complete();
        });
    }
}
