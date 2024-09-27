import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { LocalStorageUtils } from '../utils/localstorage';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    localStorageUtil = new LocalStorageUtils();

    //intercepta a requisicao
    //tem outro exemplo no projeto fluxo de navegacao
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //se houver uma requisicao e dentro do pipe tiver um erro vai verificar qual o status e fazer o que se espera, no caso o redirect
        return next.handle(req).pipe(catchError(error => {

            if (error instanceof HttpErrorResponse) {
                console.log("erro" + error);

                if (error.status === 401) {
                    this.localStorageUtil.limparDadosLocaisUsuario();
                    this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url } }); // salva no query param, a url para retornar depois de realizar login
                }
                if (error.status === 403) {
                    console.log("entrou aqui");
                    this.router.navigate(['/acesso-negado']);
                }
            }

            console.log("intercept" + error);
            console.dir(error);
            return throwError(() => error);
        }));
    }

}