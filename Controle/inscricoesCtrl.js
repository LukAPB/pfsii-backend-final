import Inscricao from "../Modelo/inscricoes.js";

export default class InscricaoCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            // extraindo dados de uma nova inscrição
            const cpfCandidato = dados.cpfCandidato;
            const codigoVaga = dados.codigoVaga;
            const dataInscricao = dados.dataInscricao;
            const horarioInscricao = dados.horarioInscricao;

            // instanciando um objeto do tipo Inscricao
            const inscricao = new Inscricao(cpfCandidato, codigoVaga, dataInscricao, horarioInscricao);

            // resolver a promise
            inscricao.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Inscrição registrada com sucesso!",
                    "codigo": inscricao.id
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar a inscrição: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
                const inscricao = new Inscricao(0);
                inscricao.consultar().then((listaInscricoes) => {
                    resposta.status(200).json({
                        "status": true,
                        "listaInscricoes": listaInscricoes
                    })
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a inscrição: " + erro.message
                    });
                })

            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um código de inscrição válido!"
                });
            }
      
    }
}
