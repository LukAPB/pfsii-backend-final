import CandidatoDAO from "../Persistencia/candidatoDAO.js";

export default class Candidato {
    #cpf;
    #nome;
    #endereco;
    #telefone;

    constructor(cpf='', nome='', endereco='', telefone='') {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }
    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    toJSON() {
        return {
            'cpf': this.#cpf,
            'nome': this.#nome,
            'endereco': this.#endereco,
            'telefone': this.#telefone
        };
    }

    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.gravar(this);
    }

    async excluir() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.excluir(this);
    }

    async alterar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.atualizar(this);
    }

    async consultar() {
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.consultar();
    }
    async consultarCPF(cpf) {
        const candidatoDAO = new CandidatoDAO();
        return await candidatoDAO.consultarCPF(cpf);
    }

}
