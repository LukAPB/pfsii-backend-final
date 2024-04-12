import Vaga from '../Modelo/vagas.js';

export default class VagaCTRL {
    
    async criar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cargo = dados.cargo;
            const salario = dados.salario;
            const cidade = dados.cidade;
            const quantidade = dados.quantidade;

            if (cargo && salario && cidade && quantidade) {
                const vaga = new Vaga(cargo, salario, cidade, quantidade);

                try {
                    await vaga.gravar();
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Vaga criada com sucesso!"
                    });
                } catch (erro) {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                }
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de uma vaga conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou dados da vaga no formato JSON não fornecidos! Consulte a documentação da API"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        // Lógica para atualizar uma vaga
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const vaga = new Vaga();
            try {
                const listaVagas = await vaga.consultar();
                resposta.status(200).json({
                    status: true,
                    listaVagas: listaVagas
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Por favor, informe um código de vaga válido!"
            });
        }   
        
        
    }

    async consultarPorCodigo(requisicao, resposta) {
        // Lógica para consultar uma vaga pelo código
    }
}
