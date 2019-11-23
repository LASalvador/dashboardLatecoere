const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const server = express();

const port = 3102;

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port, () => console.log(`Servidor rodando na porta ${port}...`));