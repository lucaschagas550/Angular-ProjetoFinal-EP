import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

import { FornecedorAppComponent } from './fornecedor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedorRoutingModule } from './fornecedor.route';
import { FornecedorService } from "./services/fornecedor.service";
import { FornecedorGuard } from "./services/fornecedor.guard";
import { FornecedorResolve } from "./services/fornecedor.resolve";
import { NovoComponent } from "./novo/novo.component";
import { ListaComponent } from "./lista/lista.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { DetalhesComponent } from "./detalhes/detalhes.component";

@NgModule({
  declarations: [
    FornecedorAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule, // configuracao de roteamento do modulo
    FormsModule, // Para cadastro de formulario
    ReactiveFormsModule, // Para cadastro de formulario reativos
    NgxSpinnerModule, //pacote para usar o spinner
    NgxMaskDirective,// Para utilizar mascara 
    NgxMaskPipe, // Para utilizar mascara 
  ],
  providers: [
    FornecedorService, //servico para fornecedor
    FornecedorGuard, //guarda de rotas do fornecedor
    FornecedorResolve, // resolver para obter o id da url
    provideNgxMask(),//pacote de mascaras para o uso no html
  ]
})
export class FornecedorModule { }
