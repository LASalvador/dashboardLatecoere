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

// retorna todos os registros
// URL http://localhost:3102/tudo
app.get("/tudo", bd.getDados);
// http://localhost:3102/range/1603
app.get('/range/:range', bd.getByRange);
// http://localhost:3102/linha/Porta Pax Dian.
app.get('/linha/:linha', bd.getByLinha);
// http://localhost:3102/descricao/SELAGEM
app.get('/descricao/:descricao', bd.getByDescricao);
// http://localhost:3102/rangelinha/1603/Porta Pax Dian.
app.get('/rangelinha/:range/:linha', bd.getByRangeLinha);   
// http://localhost:3102/rangelinhadescricao/1603/Porta Pax Dian./SELAGEM
app.get('/rangelinhadescricao/:range/:linha/:descricao', bd.getByRangeLinhaDescricao);

// http://localhost:3102/minmaxrange/1603
app.get('/minmaxrange/:range', bd.getMinMaxByRange);
// http://localhost:3102/minmaxrangelinha/1603/Porta Pax Dian.
app.get('/minmaxrangelinha/:range/:linha', bd.getMinMaxByRangeLinha);
// http://localhost:3102/minmaxrangelinhadescricao/1603/Porta Pax Dian./SELAGEM
app.get('/minmaxrangelinhadescricao/:range/:linha/:descricao', bd.getMinMaxByRangeLinhaDescricao);

// http://localhost:3102/drange
app.get('/drange', bd.getDistinctRange);
// http://localhost:3102/dlinha
app.get('/dlinha', bd.getDistinctLinha);
// http://localhost:3102/ddescricao
app.get('/ddescricao', bd.getDistinctDescricao);
// http://localhost:3102/dlinhabyrange/1603
app.get('/dlinhabyrange/:range', bd.getDistinctLinhaByRange);
// http://localhost:3102/ddescricaobyrangelinha/1603/Porta Pax Dian.
app.get('/ddescricaobyrangelinha/:range/:linha', bd.getDistinctDescricaoByRangeLinha);

/* 
para deixar o seu servidor rodando na porta 3102
http://localhost:3102/
*/
app.listen(3102, () => {
    console.log("Servidor rodando na porta 3102...");
});