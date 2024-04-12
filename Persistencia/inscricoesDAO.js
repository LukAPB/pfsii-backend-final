import conectar from "./conexao.js";

export default class InscricaoDao {
    async gravar(inscricao) {
        if (this._isValidInscricao(inscricao)) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = 'INSERT INTO inscricoes(pk_cand_cpf, pk_vaga_codigo, data_inscricao, horario_inscricao) VALUES(?,?,?,?)';
                const parametros = [inscricao.cpfCandidato, inscricao.codigoVaga, inscricao.dataInscricao, inscricao.horarioInscricao];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            }
            catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async alterar(inscricao) {
        // Implementar método de alteração se necessário
    }

    async excluir(inscricaoId) {
        const conexao = await conectar();
        await conexao.execute('DELETE FROM inscricoes WHERE pk_inscricao_id = ?', [inscricaoId]);
    }

    async consultarPorId(inscricaoId) {
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute('SELECT * FROM inscricoes WHERE pk_inscricao_id = ?', [inscricaoId]);
        return registros[0]; // Retorna a primeira inscrição encontrada com esse ID
    }

    async consultarPorCpf(cpf) {
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute('SELECT * FROM inscricoes WHERE pk_cand_cpf = ?', [cpf]);
        return registros; // Retorna todas as inscrições do usuário com esse CPF
    }

    async consultar() {
        const conexao = await conectar();
        const [registros] = await conexao.execute('SELECT * FROM inscricoes');
        return registros;
    }


    _isValidInscricao(inscricao) {
        // Implementar validações da inscrição aqui, se necessário
        return true; // Neste exemplo, consideramos que a inscrição é sempre válida
    }
}
