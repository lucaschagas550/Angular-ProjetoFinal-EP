import { ContaGuard } from './services/conta.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ContaAppComponent } from './conta.app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ContaService } from './services/conta.service';

import { ContaRoutingModule } from './conta.routing';

import { NarikCustomValidatorsModule } from '@narik/custom-validators';


@NgModule({
  declarations: [
    ContaAppComponent,
    CadastroComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // para roteamento
    ContaRoutingModule, // configuracao de roteamento do modulo
    FormsModule, // Para cadastro de formulario
    ReactiveFormsModule, // Para cadastro de formulario reativos
    HttpClientModule, // Para comunicacao com backend via HTTP
    NarikCustomValidatorsModule, //pacote de validacoes 
  ],
  providers: [
    ContaService,
    ContaGuard, //Guarda de rota
  ]
})
export class ContaModule { }
