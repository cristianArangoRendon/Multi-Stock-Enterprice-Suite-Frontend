import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './HttpService';
import { ResponseDTO } from 'src/app/core/DTOs/ResponseDTO';
@Injectable({ providedIn: 'root' })
export class LoginService
{
    constructor(private _httpService: HttpService) {}
    auth(data: object): Observable<ResponseDTO> {
        console.log(data);
        return this._httpService.post('Generate/Token', null ,data);
    }
}
