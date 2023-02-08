export class LocalStorageUtils {

    public obterUsuario() {
        var value = localStorage.getItem('devio.user') || null;
        if (value)
            return JSON.parse(value);

        return "";
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('devio.token'); //nome da chave do token em localstorage
        localStorage.removeItem('devio.user'); //nome da chave do user em localstorage
    }

    public obterTokenUsuario(): string {
        var value = localStorage.getItem('devio.token');
        if (value)
            return value;

        return "";
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }
}