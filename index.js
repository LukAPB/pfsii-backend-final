import express from 'express';
import cors from 'cors';
import rotaCandidato from './Rotas/rotaCandidato.js';
import rotaVagas from './Rotas/rotaVagas.js';
import rotaInscricoes from './Rotas/rotaInscricoes.js';
import dotenv from 'dotenv';



const host='localhost';
const porta='4000';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/candidatos',rotaCandidato);
app.use('/vagas',rotaVagas);
app.use('/inscricoes',rotaInscricoes);


app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
