import { ResponseDTO } from "src/app/core/DTOs/ResponseDTO";
import { HttpServices } from "../HttpService/HttpService";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({providedIn: "root"})
export class  CompanyService{

    private refreshNeeded$ = new BehaviorSubject<boolean>(false);
    constructor(private _httpService: HttpServices) {}

    get refreshNeededObservable() {
        return this.refreshNeeded$.asObservable();
    }

    GetCompanies(): Observable<ResponseDTO> {
        return this._httpService.get('Companies', null);
    }
    Create(data:object): Observable<ResponseDTO> {
        return this._httpService.post('company', data).pipe(
            tap((response) => {
                if (response.isSuccess) {
                    this.refreshNeeded$.next(true);
                }
            })
        );
    }

}
