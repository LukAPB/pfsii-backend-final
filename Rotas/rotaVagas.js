import { Router } from "express";
import VagasCtrl from "../Controle/vagasCtrl.js";


const vagasCtrl = new VagasCtrl();
const rotaVagas = new Router();

rotaVagas
.get('/', vagasCtrl.consultar)
.get('/:termo', vagasCtrl.consultarPorCodigo)
.post('/', vagasCtrl.criar)
.put('/', vagasCtrl.atualizar)


export default rotaVagas;