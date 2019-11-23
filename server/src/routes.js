const express = require('express');
const bd = require('./clausulas');
const diffdata = require('./diffdata');
const routes = express.Router();

// http://localhost:3102/group/CF-3
routes.get('/group/:linha', bd.getLinhaGroupByPosto);
// http://localhost:3102/group/CF-3/L1545
routes.get('/group/:linha/:range', bd.getLinhaRangeGroupByPosto);
// http://localhost:3102/drange/CF-3
routes.get('/drange/:linha', bd.getDistinctRangeByLinha);

module.exports = routes