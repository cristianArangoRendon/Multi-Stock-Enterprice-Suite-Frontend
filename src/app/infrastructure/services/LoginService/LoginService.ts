import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServices } from '../HttpService/HttpService';
import { ResponseDTO } from 'src/app/core/DTOs/ResponseDTO';
@Injectable({ providedIn: 'root' })
export class LoginService
{
    constructor(private _httpService: HttpServices) {}
    auth(data: object): Observable<ResponseDTO> {
        return this._httpService.post('Generate/Token', null ,data);
    }
}
