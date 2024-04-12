import { Router } from "express";
import CandidatoCtrl from "../Controle/candidatoCtrl.js";

const rotaCandidato = new Router();
const candidatoCtrl = new CandidatoCtrl();
//definição de endpoints que serão processadas pela camada de controle
//para um determinado cliente

rotaCandidato
.post('/', candidatoCtrl.criar)
.put('/',candidatoCtrl.atualizar)
.delete('/',candidatoCtrl.excluir)
.get('/', candidatoCtrl.consultar)
.get('/:cpf', candidatoCtrl.cosultarCPF);

export default rotaCandidato;