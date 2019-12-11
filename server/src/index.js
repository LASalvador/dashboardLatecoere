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
const port = 3102;

// http://localhost:3102/group/CF-3
app.get('/group/:linha', bd.getLinhaGroupByPosto);
// http://localhost:3102/group/CF-3/L1545
app.get('/group/:linha/:range', bd.getLinhaRangeGroupByPosto);
// http://localhost:3102/drange/CF-3
app.get('/drange/:linha', bd.getDistinctRangeByLinha);

// http://localhost:3102/closed/OW
app.get('/closed/:linha', bd.getLastClosedRangeByPosto);

/* 
para deixar o seu servidor rodando na porta 3102
http://localhost:3102/
*/
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});


