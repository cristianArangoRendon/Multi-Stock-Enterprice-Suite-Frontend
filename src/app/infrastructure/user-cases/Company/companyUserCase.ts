import { ResponseDTO } from 'src/app/core/DTOs/ResponseDTO';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { CompanyService } from '../../services/Company/CompanyService';
@Injectable({providedIn: "root"})
export class CompanyUserCase {

    constructor(private _Company:CompanyService) {}

    companies(): Observable<ResponseDTO> {
        return new Observable<ResponseDTO>((observer) => {
            this._Company.GetCompanies().subscribe((response: ResponseDTO) => {
                    if (response.isSuccess) {
                        const data = response.data;
                    } else {
                        observer.next(response);
                    }
                });
        });
    }

}
