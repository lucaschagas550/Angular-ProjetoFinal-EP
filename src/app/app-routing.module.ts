import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' //nome tem que ser indentico
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {//Carregar modulo filho com lazyload
    path: 'conta',
    loadChildren: () => import('./conta/conta.module')
      .then(module => module.ContaModule)
  },
  {
    path: 'fornecedores',
    loadChildren: () => import('./fornecedor/fornecedor.module')
      .then(m => m.FornecedorModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produto/produto.module')
      .then(m => m.ProdutoModule)
  },


  {//Rota para acesso negado a algum recurso
    path: 'acesso-negado',
    component: AcessoNegadoComponent
  },
  {//Rota exclusiva
    path: 'nao-encontrado',
    component: NotFoundComponent
  },
  {// Em caso de Erro 404 chama este component, sempre deixar por ultimo para nao ser chamado por engano
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
