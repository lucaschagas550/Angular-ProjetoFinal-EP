import { Fornecedor } from './../models/fornecedor';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { CepConsulta, Endereco } from '../models/endereco';

@Injectable()
export class FornecedorService extends BaseService {

  fornecedor!: Fornecedor;

  constructor(private http: HttpClient) { super() }

  obterTodos(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores")
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return new Observable<Fornecedor>();
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return new Observable<Fornecedor>();

  }

  excluirFornecedor(id: string): Observable<Fornecedor> {
    return new Observable<Fornecedor>();

  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return new Observable<Endereco>();

  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return new Observable<CepConsulta>();

  }
}
