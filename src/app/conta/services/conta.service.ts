import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

import { Usuario } from './../models/usuario';

@Injectable()
export class ContaService extends BaseService {

    constructor(private http: HttpClient) { super(); }

    registrarUsuario(usuario: Usuario): Observable<Object> {
        let response = this.http
            .post(this.UrlServiceV1 + 'nova-conta', usuario, {
                headers: this.ObterHeaderJson().headers,
                observe: 'body',
                responseType: 'json',
            })
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;

    }

    login(usuario: Usuario): Observable<Usuario> {
        let response = this.http
            .post(this.UrlServiceV1 + 'entrar', usuario, {
                headers: this.ObterHeaderJson().headers,
                observe: 'body',
                responseType: 'json',
            })
            .pipe(
                map(this.extractData),
                catchError(this.serviceError));

        return response;
    }
}
