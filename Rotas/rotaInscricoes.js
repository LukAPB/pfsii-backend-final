import { Router } from "express";
import InscricaoCtrl from "../Controle/inscricoesCtrl.js";

const rotaInscricoes = new Router();
const inscricoesCtrl = new InscricaoCtrl();

rotaInscricoes
.get('/', inscricoesCtrl.consultar)
.post('/', inscricoesCtrl.gravar);
//.patch('/', pedidoCtrl.atualizar)
//.put('/', pedidoCtrl.atualizar)
//.delete('/', pedidoCtrl.excluir);

export default rotaInscricoes;