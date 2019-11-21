// importa o módulo express e coloca na variável express
const express = require("express");
// importa o módulo CORS
var cors = require('cors');
// cria a aplicação chamando a função express()
const app = express();
// para aceitar CORS
app.use(cors());
// importar o módulo que possui o CRUD
const bd = require('./clausulas');

/* LISTAR OS DADOS DISTINTOS */
// http://localhost:3102/drange
app.get('/drange', bd.getDistinctRange);
// http://localhost:3102/dlinha
app.get('/dlinha', bd.getDistinctLinha);
// http://localhost:3102/dposto
app.get('/dposto', bd.getDistinctPosto);

/* LISTAR OS DADOS */
// http://localhost:3102/range/1603
app.get('/range/:range', bd.getByRange);
// http://localhost:3102/linha/Porta Pax Dian.
app.get('/linha/:linha', bd.getByLinha);
// http://localhost:3102/posto/GM5
app.get('/posto/:posto', bd.getByPosto);
// http://localhost:3102/dados/1603/GM5
app.get('/dados/:range/:posto', bd.getByRangePosto);
// http://localhost:3102/dados/1603/Porta Pax Dian./GM5
app.get('/dados/:range/:linha/:posto', bd.getByRangeLinhaPosto);


/* LISTAR AS ESTATÍSTICAS DOS DADOS */
// http://localhost:3102/statsrange/1603
app.get('/statsrange/:range', bd.getStatsByRange);
// http://localhost:3102/statslinha/Porta Pax Dian.
app.get('/statslinha/:linha', bd.getStatsByLinha);
// http://localhost:3102/statsposto/GM5
app.get('/statsposto/:posto', bd.getStatsByPosto);
// http://localhost:3102/stats/1603/GM5
app.get('/stats/:range/:posto', bd.getStatsByRangePosto);
// http://localhost:3102/stats/1603/Porta Pax Dian./GM5
app.get('/stats/:range/:linha/:posto', bd.getStatsByRangeLinhaPosto);

/* 
para deixar o seu servidor rodando na porta 3102
http://localhost:3102/
*/
app.listen(3102, () => {
    console.log("Servidor rodando na porta 3102...");
});
