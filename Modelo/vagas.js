import VagaDAO from '../Persistencia/vagasDAO.js';

export default class Vaga {

    #codigo;
    #cargo;
    #salario;
    #cidade;
    #quantidade;

    constructor(cargo, salario, cidade, quantidade) {
        this.#cargo = cargo;
        this.#salario = salario;
        this.#cidade = cidade;
        this.#quantidade = quantidade;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }

    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    toJSON() {
        return {
         
            "cargo": this.#cargo,
            "salario": this.#salario,
            "cidade": this.#cidade,
            "quantidade": this.#quantidade
        }
    }

    async gravar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.incluir(this);
    }

    async atualizar() {
        const vagaBD = new VagaDAO();
        await vagaBD.alterar(this);
    }

    async removerDoBancoDados() {
        const vagaBD = new VagaDAO();
        await vagaBD.excluir(this);
    }

    async consultar(termo) {
        const vagaBD = new VagaDAO();
        const vagas = await vagaBD.consultar(termo);
        return vagas;
    }
}
