import { ResponseDTO } from "src/app/core/DTOs/ResponseDTO";
import { HttpServices } from "../HttpService/HttpService";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({providedIn: "root"})
export class  CompanyService{
    constructor(private _httpService: HttpServices) {}
    GetCompanies(): Observable<ResponseDTO> {
        return this._httpService.get('Companies', null);
    }
    Create(data:object): Observable<ResponseDTO> {
        return this._httpService.post('company', data);
    }

}
