import Candidato from "../Modelo/Candidato.js";

export default class CandidatoCtrl {

    criar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const telefone = dados.telefone;

            if (cpf && nome && endereco && telefone) {
                const candidato = new Candidato(cpf, nome, endereco, telefone);
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "cpf": candidato.cpf,
                        "mensagem": "Usuário criado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao criar usuário: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados do usuário conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para criar um usuário!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.pk_cand_cpf;
            const nome = dados.cand_nome;
            const endereco = dados.cand_endereco;
            const telefone = dados.cand_telefone;

            if (cpf && nome && endereco && telefone) {
                const candidato = new Candidato(cpf, nome, endereco, telefone);
                candidato.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Usuário atualizado com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar usuário: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do usuário conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um usuário!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.pk_cand_cpf;

            if (cpf) {
                const candidato = new Candidato(cpf);
                candidato.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Usuário excluído com sucesso!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir usuário: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do usuário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um usuário!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const candidato = new Candidato();
            candidato.consultar().then((listaCandidatos) => {
                resposta.json({
                    status: true,
                    listaCandidatos
                });
            })
            .catch((erro) => {
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter os usuários: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar usuários!"
            });
        }
    }

    cosultarCPF(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            const cpf = requisicao.params.cpf;
            if (cpf) {
                const candidato = new Candidato(cpf);
                candidato.consultarPorCPF().then((candidato) => {
                    resposta.json({
                        status: true,
                        candidato
                    });
                })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter o usuário: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o CPF do usuário!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar um usuário!"
            });
        }
    }
}
