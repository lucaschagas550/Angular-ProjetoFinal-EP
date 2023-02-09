import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';

import { ProdutoRoutingModule } from './produto.route';
import { ProdutoAppComponent } from './produto.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ProdutoService } from './services/produto.service';
import { ProdutoResolve } from './services/produto.resolve';
import { ProdutoGuard } from './services/produto.guard';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    ProdutoAppComponent,
    ListaComponent,
    NovoComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule, // configuracao de roteamento do modulo
    NgxSpinnerModule, //pacote para usar o spinner
    FormsModule, // Para cadastro de formulario
    ReactiveFormsModule, // Para cadastro de formulario reativos
    ImageCropperModule,
    NgxMaskDirective,// Para utilizar mascara 
    NgxMaskPipe, // Para utilizar mascara 
  ],
  providers: [
    ProdutoService,
    ProdutoResolve,
    ProdutoGuard,
    provideNgxMask(),//pacote de mascaras para o uso no html
  ]
})
export class ProdutoModule { }
