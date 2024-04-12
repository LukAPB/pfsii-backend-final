import conectar from "./conexao.js";
import Vaga from '../Modelo/vagas.js';

export default class VagaDAO {

    async incluir(vaga) {
        if (vaga instanceof Vaga) {
            const conexao = await conectar();
            const sql = "INSERT INTO vagas(vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade) VALUES(?,?,?,?)";
            const valores = [vaga.cargo, vaga.salario, vaga.cidade, vaga.quantidade];
            await conexao.query(sql, valores);
        }
    }

    async alterar(vaga) {
        if (vaga instanceof Vaga) {
            const conexao = await conectar();
            const sql = "UPDATE vagas SET vaga_cargo=?, vaga_salario=?, vaga_cidade=?, vaga_quantidade=? WHERE pk_vaga_codigo=?";
            const valores = [vaga.cargo, vaga.salario, vaga.cidade, vaga.quantidade, vaga.codigo];
            await conexao.query(sql, valores);
        }
    }

    async excluir(vaga) {
        if (vaga instanceof Vaga) {
            const conexao = await conectar();
            const sql = "DELETE FROM vagas WHERE pk_vaga_codigo=?";
            const valores = [vaga.codigo];
            await conexao.query(sql, valores);
        }
    }


    async consultar() {
        const conexao = await conectar();
        const [registros] = await conexao.execute('SELECT * FROM vagas');
        return registros;
    }

    // async consultar() {
    //     const conexao = await conectar();
    //     const sql = "SELECT * FROM vagas";
    //     const [rows] = await conexao.query(sql);
    //     const listaVagas = [];
    //     for (const row of rows) {
    //         const vaga = new Vaga(row['pk_vaga_codigo'], row['vaga_cargo'], row['vaga_salario'], row['vaga_cidade'], row['vaga_quantidade']);
    //         listaVagas.push(vaga);
    //     }
    //     return listaVagas;
    // }

    async consultarPorCodigo(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM vagas WHERE pk_vaga_codigo = ?";
        const valores = [codigo];
        const [rows] = await conexao.query(sql, valores);
        const listaVagas = [];
        for (const row of rows) {
            const vaga = new Vaga(row['pk_vaga_codigo'], row['vaga_cargo'], row['vaga_salario'], row['vaga_cidade'], row['vaga_quantidade']);
            listaVagas.push(vaga);
        }
        return listaVagas;
    }
}
