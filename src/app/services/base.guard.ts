import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router) { }

    protected validarClaims(routeAc: ActivatedRouteSnapshot): boolean {

        if (!this.localStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: this.router.url } }); //obtem rota antes do redirecinamento e a aguarda para depois retornar
        }

        let user = this.localStorageUtils.obterUsuario();

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim']; //obtem a chave claim da posicao 0
            console.log(claim);

            if (claim) { //rota tem claims
                if (!user.claims) { //usuario tem alguma claims
                    this.navegarAcessoNegado();
                }

                let userClaims = user.claims.find((x: any) => x.type === claim.nome);

                if (!userClaims) {
                    this.navegarAcessoNegado();
                }

                let valoresClaim = userClaims.value as string;

                //include eh funciona como um contains
                if (!valoresClaim.includes(claim.valor)) {
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;
    }

    private navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }
}