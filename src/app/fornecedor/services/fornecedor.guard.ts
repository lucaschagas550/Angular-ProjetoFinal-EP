import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { BaseGuard } from 'src/app/services/base.guard';
import { NovoComponent } from '../novo/novo.component';

@Injectable({
  providedIn: 'root'
})
export class FornecedorGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent>{

  constructor(protected override router: Router) { super(router); }

  //Ao sair da rota
  canDeactivate(component: NovoComponent) {
    if (component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
    }
    return true
  }

  //Ao entrar na rota
  //add state: RouterStateSnapshot em parametro 
  canActivate(routeAc: ActivatedRouteSnapshot) {
    // e entao enviar o state para usar o state.url, para obter a ultima rota acessada, seria uma outra forma, em vez do queryparameter
    return super.validarClaims(routeAc);
  }
}