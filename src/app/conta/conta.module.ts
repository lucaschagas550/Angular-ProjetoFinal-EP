import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContaAppComponent } from './conta.app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

import { ContaRoutingModule } from './conta.routing';


@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // para roteamento
    ContaRoutingModule,
    FormsModule, // Para cadastro de formulario
    ReactiveFormsModule, // Para cadastro de formulario reativos
    HttpClientModule, // Para comunicacao com backend via HTTP
  ]
})
export class ContaModule { }
