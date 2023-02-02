import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';

import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Injectable()
export class ContaGuard implements CanActivate, CanDeactivate<CadastroComponent> {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  //Ao tentar sair da rota ela vai verficar se tem mudancas no formulario e avisar o usuario, no arquivo de route.ts precisa adicionar
  // canDeactivate para a rota especifica
  canDeactivate(component: CadastroComponent): boolean {
    if (component.mudancasNaoSalvas)
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');

    return true
  }

  // Verificar se o usuario esta logado, nao podera entrar em um rota e sera redirecionado, se nao estiver logado pode entrar
  canActivate(): boolean {
    if (this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/home']);
    }

    return true;
  }
}
