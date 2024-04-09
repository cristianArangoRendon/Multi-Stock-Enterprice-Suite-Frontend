import { Observable } from "rxjs";
import { AppConfig } from "../DTOs/AppConfig";

export interface IConfigService{
    getConfiguration(): Observable<AppConfig>
}
