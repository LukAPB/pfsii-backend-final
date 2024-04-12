import Candidato from "../Modelo/Candidato.js"; // Supondo que você tenha um modelo de usuário
import conectar from "./conexao.js";

export default class CandidatoDAO {
    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = "INSERT INTO candidatos(pk_cand_cpf, cand_nome, cand_endereco, cand_telefone) VALUES(?, ?, ?, ?)";
            const parametros = [candidato.cpf, candidato.nome, candidato.endereco, candidato.telefone];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            // Você pode fazer algo com o retorno se necessário
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(candidato) {
        if (candidato instanceof Candidato) {
            const sql = "UPDATE candidatos SET cand_nome = ?, cand_endereco = ?, cand_telefone = ? WHERE pk_cand_cpf = ?";
            const parametros = [candidato.nome, candidato.endereco, candidato.telefone, candidato.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const sql = "DELETE FROM candidatos WHERE pk_cand_cpf = ?";
            const parametros = [candidato.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar() {
        const conexao = await conectar();
        const [registros] = await conexao.execute('SELECT * FROM candidatos');
        return registros;
    }

    async consultarCPF(cpf) {
        const conexao = await conectar();
        const [registros] = await conexao.execute('SELECT * FROM candidatos WHERE pk_cand_cpf = ?', [cpf]);
        return registros;
    }

    // async consultar() {
    //     let sql = '';
    //     let parametros = [];

    //     if (!isNaN(parseInt(parametroConsulta))) {
    //         sql = 'SELECT * FROM candidatos WHERE pk_cand_cpf = ?';
    //         parametros = [parametroConsulta];
    //     } else {
    //         if (!parametroConsulta) {
    //             parametroConsulta = '';
    //         }
    //         sql = "SELECT * FROM candidatos WHERE cand_nome LIKE ?";
    //         parametros = ['%' + parametroConsulta + '%'];
    //     }

    //     const conexao = await conectar();
    //     const [registros, campos] = await conexao.execute(sql, parametros);
    //     let listaCandidatos = [];
    //     for (const registro of registros) {
    //         const Candidato = new Candidato(registro.pk_cand_cpf, registro.cand_nome, registro.cand_endereco, registro.cand_telefone);
    //         listaCandidatos.push(Candidato);
    //     }
    //     return listaCandidatos;
    // }
}
