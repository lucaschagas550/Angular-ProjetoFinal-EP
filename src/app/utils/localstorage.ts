export class LocalStorageUtils {

    public obterUsuario() {
        var value = localStorage.getItem('devio.user') || null;
        if (value)
            return JSON.parse(value);

        return "";
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.data.accessToken);
        this.salvarUsuario(response.data.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
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