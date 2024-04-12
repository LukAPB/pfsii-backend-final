import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export function autenticar(requisicao, resposta) {
    const Candidato = requisicao.body.Candidato;
    const senha = requisicao.body.senha;
    if (Candidato === 'admin' && senha === 'admin'){
        requisicao.session.candidatoAutenticado = Candidato;
        resposta.json({
            "status": true,
            "token": assinar({Candidato})
        })
    }
    else{
        requisicao.session.candidatoAutenticado = null;
        resposta.status(401).json({
            "status": false,
            "mensagem": "Usuário ou senha inválidos!"
        })
    }
}

export function verificarAcesso(requisicao, resposta, next) {
    const token = requisicao.headers['authorization'];
    let tokenDecodificado = undefined;
    if (token){
        tokenDecodificado = verificarAssinatura(token);
    }
    

    if ((tokenDecodificado !== undefined) && (tokenDecodificado.Candidato.Candidato == requisicao.session.candidatoAutenticado)) {
        next();
    }
    else{
        resposta.status(401).json({
            "status": false,
            "mensagem": "Acesso não autorizado. Faça o login na aplicação!"
        })
    }
}