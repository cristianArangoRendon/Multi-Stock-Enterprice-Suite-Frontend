import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConfigService } from '../Config/ConfigService';
import { ResponseDTO } from 'src/app/core/DTOs/ResponseDTO';
import { IHttpService } from 'src/app/core/Interfaces/IHttpService';
import { jwtDecode } from "jwt-decode";
import { UserDTO } from 'src/app/core/DTOs/UserDTO';
@Injectable({
    providedIn: 'root',
})
export class HttpServices implements IHttpService {
    private apiUrl: string = '';
    private apiUrlLoaded: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    constructor(
        private _configService: ConfigService,
        private httpClient: HttpClient,
        private _router: Router
    ) {
        this.initialize();
    }

    private initialize(): void {
        this._configService.getConfiguration().subscribe((config) => {
            console.log(this.apiUrl)
            this.apiUrl = config.API_URL;
            this.apiUrlLoaded.next(true);
        });
    }

    private waitUntilApiUrlLoaded(): Observable<boolean> {
        return this.apiUrlLoaded.asObservable().pipe(
            filter((loaded) => loaded),
            take(1)
        );
    }

    private addJwtTokenHeader(): HttpHeaders {
        const token = localStorage.getItem('authToken');

        if (!token) {
            return new HttpHeaders();
        }

        try {
            const decoded: any = this.jwtDecodeToken();
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem('authToken');
                this._router.navigate(['/Login']);
            }

            return new HttpHeaders({
                Authorization: `Bearer ${token}`,
            });
        } catch (error) {
            return new HttpHeaders();
        }
    }

    private handleError(error: any): Observable<never> {
        console.error('HTTP error:', error);
        throw error;
    }

    private buildUrl(endpoint: string, params?: any): string {
        let url = `${this.apiUrl}/${endpoint}`;
        if (params && typeof params === 'object') {
            const isSingleValue = !(params.constructor === Object);
            const queryParams = new HttpParams({
                fromObject: isSingleValue ? { value: params } : params,
            });
            url += `?${queryParams.toString()}`;
        }
        return url;
    }

    private performHttpRequest<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        endpoint: string,
        params?: any,
        body?: any
    ): Observable<T> {
        return new Observable<T>((observer) => {
            this.waitUntilApiUrlLoaded().subscribe({
                next: () => {
                    const url = this.buildUrl(endpoint, params);
                    let httpCall: Observable<T>;

                    switch (method) {
                        case 'get':
                            httpCall = this.httpClient.get<T>(url, {
                                headers: this.addJwtTokenHeader(),
                            });
                            break;
                        case 'post':
                            httpCall = this.httpClient.post<T>(url, body, {
                                headers: this.addJwtTokenHeader(),
                            });
                            break;
                        case 'put':
                            httpCall = this.httpClient.put<T>(url, body, {
                                headers: this.addJwtTokenHeader(),
                            });
                            break;
                        case 'delete':
                            httpCall = this.httpClient.delete<T>(url, {
                                headers: this.addJwtTokenHeader(),
                            });
                            break;
                    }

                    httpCall.pipe(catchError(this.handleError)).subscribe({
                        next: (response) => observer.next(response),
                        error: (err) => observer.error(err),
                        complete: () => observer.complete(),
                    });
                },
            });
        });
    }

    get(endpoint: string, params?: any): Observable<ResponseDTO> {
        return this.performHttpRequest<ResponseDTO>('get', endpoint, params);
    }

    post(endpoint: string, params?: any, body?: any): Observable<ResponseDTO> {
        return this.performHttpRequest<ResponseDTO>(
            'post',
            endpoint,
            params,
            body
        );
    }

    put(endpoint: string, params?: any, body?: any): Observable<ResponseDTO> {
        return this.performHttpRequest<ResponseDTO>(
            'put',
            endpoint,
            params,
            body
        );
    }

    delete(endpoint: string, params?: any): Observable<ResponseDTO> {
        return this.performHttpRequest<ResponseDTO>('delete', endpoint, params);
    }


    jwtDecodeToken() {
        try {
            const token = localStorage.getItem('authToken') ?? "";
            const decoded:  UserDTO = jwtDecode(token);
            const userDTO: UserDTO = {
                UserName: decoded.UserName,
                LastName: decoded.LastName,
                Email: decoded.Email,
                UserId: decoded.UserId,
                idCompany: decoded.idCompany,
                idRol: decoded.idRol,
                gender: decoded.gender,
                image : decoded.image,
                lastLoginDate: decoded.lastLoginDate,
            };
            return of(userDTO);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return throwError(error);
        }
    }
}




