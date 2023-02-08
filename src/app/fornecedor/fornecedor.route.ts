import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorAppComponent } from './fornecedor.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { FornecedorGuard } from './services/fornecedor.guard';
import { FornecedorResolve } from './services/fornecedor.resolve';


const fornecedorRouterConfig: Routes = [
    {
        path: '', component: FornecedorAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [FornecedorGuard],
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Adicionar' } }] //Cria um objeto com dados que eh exigido para o acesso
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
                resolve: {
                    fornecedor: FornecedorResolve //snapshot nome tem que ser fornecedor no momento de recuperar
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    fornecedor: FornecedorResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [FornecedorGuard],
                data: [{ claim: { nome: 'Fornecedor', valor: 'Excluir' } }],
                resolve: {
                    fornecedor: FornecedorResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(fornecedorRouterConfig)
    ],
    exports: [RouterModule]
})
export class FornecedorRoutingModule { }