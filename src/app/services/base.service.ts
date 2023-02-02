import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localstorage";


export abstract class BaseService {
    protected UrlServiceV1: string = environment.apiUrlv1;
    public LocalStorage = new LocalStorageUtils(); //armazenamento de valores local no browser

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
    }

    protected extractData(response: any): any {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {

            //pode tratar com status/statusText de erros com mensagens personalizadas
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}