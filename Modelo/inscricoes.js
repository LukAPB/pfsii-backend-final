import InscricaoDAO from "../Persistencia/inscricoesDAO.js";

export default class Inscricao {
    #id;
    #cpfCandidato;
    #codigoVaga;
    #dataInscricao;
    #horarioInscricao;

    constructor( cpfCandidato, codigoVaga, dataInscricao, horarioInscricao) {
        this.#cpfCandidato = cpfCandidato;
        this.#codigoVaga = codigoVaga;
        this.#dataInscricao = dataInscricao;
        this.#horarioInscricao = horarioInscricao;
    }

    // Métodos de acesso (get) e modificação (set)

    // ID
    get id() {
        return this.#id;
    }

    set id(novoId) {
        if (novoId === "" || typeof novoId !== "number") {
            console.log("Formato de dado inválido para ID");
        } else {
            this.#id = novoId;
        }
    }

    // CPF do Candidato
    get cpfCandidato() {
        return this.#cpfCandidato;
    }

    set cpfCandidato(novoCpfCandidato) {
        this.#cpfCandidato = novoCpfCandidato;
    }

    // Código da Vaga
    get codigoVaga() {
        return this.#codigoVaga;
    }

    set codigoVaga(novoCodigoVaga) {
        this.#codigoVaga = novoCodigoVaga;
    }

    // Data da Inscricao
    get dataInscricao() {
        return this.#dataInscricao;
    }

    set dataInscricao(novaDataInscricao) {
        this.#dataInscricao = novaDataInscricao;
    }

    // Horário da Inscricao
    get horarioInscricao() {
        return this.#horarioInscricao;
    }

    set horarioInscricao(novoHorarioInscricao) {
        this.#horarioInscricao = novoHorarioInscricao;
    }

    // JSON
    toJSON() {
        return {
            'cpfCandidato': this.#cpfCandidato,
            'codigoVaga': this.#codigoVaga,
            'dataInscricao': this.#dataInscricao,
            'horarioInscricao': this.#horarioInscricao
        };
    }

    async gravar() {
        const inscricaoDAO = new InscricaoDAO();
        this.id = await inscricaoDAO.gravar(this);
    }

    async atualizar() {
        //const inscricaoDAO = new InscricaoDAO();
        //await inscricaoDAO.alterar(this);
    }

    async apagar() {
        //const inscricaoDAO = new InscricaoDAO();
        //await inscricaoDAO.excluir(this);
    }

    async consultar() {
        const inscricaoDAO = new InscricaoDAO();
        const listaInscricoes = await inscricaoDAO.consultar();
        return listaInscricoes;
    }


    async consultarCPF(cpf) {
        const inscricaoDAO = new InscricaoDAO();
        const listaInscricoes = await inscricaoDAO.consultarCpf(cpf);
        return listaInscricoes;
    }
}