import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/core/DTOs/AppConfig';
import { IConfigService } from 'src/app/core/Interfaces/IConfigService';

@Injectable({
    providedIn: 'root',
})
export class ConfigService implements IConfigService {
    private _patchConfig = 'config.json';

    constructor(private http: HttpClient) {}
    getConfiguration(): Observable<AppConfig> {
        return this.http.get<AppConfig>(this._patchConfig);
    }
}
