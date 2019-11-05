// importar o módulo sqlite3
// ao definir verbose (detalhado) poderemos rastrear a pilha de execução
const sqlite3 = require('sqlite3').verbose();

// cria o BD e abre a conexão com ele, e após, dispara a função callback
const bd = new sqlite3.Database('./bdparceria.db', (error) => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log("BD criado");
        // verifica se a tabela tbdados existe
        bd.get("select name from sqlite_master where type='table' and name=?", ['tbdados'], (error, row) => {
            if (error) {
                console.log(error.message);
            }
            else if (row == undefined) {
                bd.run(
                    'create table if not exists tbdados(' +
                    'iddados integer primary key autoincrement,' +
                    'range text NULL,' +
                    'linha text NULL,' +
                    'descricao text NULL,' +
                    'datainicioplan text NULL,' +
                    'datafimplan text NULL,' +
                    'datainicioreal text NULL,' +
                    'datafimreal text NULL' +
                    ')'
                );
                console.log("tbdados criada");
            }
        });
    }
});


// retorna todos os registros da tbdados
const getDados = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal '+ 
        'from tbdados', 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem o range fornecido
const getByRange = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal '+ 
        'from tbdados where range = ?', 
        [request.params.range], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem a linha fornecida
const getByLinha = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal '+ 
        'from tbdados where linha = ?', 
        [request.params.linha], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem o range e a linha fornecidos
const getByRangeLinha = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal '+ 
        'from tbdados where range = ? and linha = ?', 
        [request.params.range, request.params.linha], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem a descricao fornecida
const getByDescricao = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal '+ 
        'from tbdados where descricao like ?', 
        [request.params.descricao], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem o range, a linha e a descricao fornecidos
const getByRangeLinhaDescricao = (request, response) => {
    bd.all(
        'select range, linha, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal,'+
        '(strftime("%s",datafimreal) - strftime("%s",datainicioreal))/86400.0 as "real_fim_inicio",'+
        '(strftime("%s",datafimplan) - strftime("%s",datainicioplan))/86400.0 as "plan_fim_inicio",'+
        '(strftime("%s",datainicioreal) - strftime("%s",datainicioplan))/86400.0 as "inicio_real_plan",'+
        '(strftime("%s",datafimreal) - strftime("%s",datafimplan))/86400.0 as "fim_real_plan" '+
        'from tbdados where range = ? and linha like ? and descricao like ?',
        [request.params.range, request.params.linha, request.params.descricao], 
        (error, rows) => {
        if (error) {
            throw error;
        }
        response.status(200).json(rows);
    });
};

// retorna as datas mínimas e máximas que possuem o range fornecido
const getMinMaxByRange = (request, response) => {
    bd.all(
        'select range, linha, descricao, '+
        'min(datainicioplan) as "mindatainicioplan", min(datafimplan) as "mindatafimplan", min(datainicioreal) as "mindatainicioreal", min(datafimreal) as "mindatafimreal",'+
        'max(datainicioplan) as "maxdatainicioplan", max(datafimplan) as "maxdatafimplan", max(datainicioreal) as "maxdatainicioreal", max(datafimreal) as "maxdatafimreal",'+
        '(strftime("%s",max(datainicioreal)) - strftime("%s",max(datainicioplan)))/86400.0 as "inicio_real_plan",'+
        '(strftime("%s",max(datafimreal)) - strftime("%s",max(datafimplan)))/86400.0 as "fim_real_plan" '+
        'from tbdados where range = ?',
        [request.params.range], 
        (error, rows) => {
        if (error) {
            throw error;
        }
        response.status(200).json(rows);
    });
};

// retorna as datas mínimas e máximas que possuem o range e a linha fornecidos
const getMinMaxByRangeLinha = (request, response) => {
    bd.all(
        'select range, linha, descricao, '+
        'min(datainicioplan) as "mindatainicioplan", min(datafimplan) as "mindatafimplan", min(datainicioreal) as "mindatainicioreal", min(datafimreal) as "mindatafimreal",'+
        'max(datainicioplan) as "maxdatainicioplan", max(datafimplan) as "maxdatafimplan", max(datainicioreal) as "maxdatainicioreal", max(datafimreal) as "maxdatafimreal",'+
        '(strftime("%s",max(datainicioreal)) - strftime("%s",max(datainicioplan)))/86400.0 as "inicio_real_plan",'+
        '(strftime("%s",max(datafimreal)) - strftime("%s",max(datafimplan)))/86400.0 as "fim_real_plan" '+
        'from tbdados where range = ? and linha like ?',
        [request.params.range, request.params.linha], 
        (error, rows) => {
        if (error) {
            throw error;
        }
        response.status(200).json(rows);
    });
};

// retorna as datas mínimas e máximas que possuem o range, a linha e a descricao fornecidos
const getMinMaxByRangeLinhaDescricao = (request, response) => {
    bd.all(
        'select range, linha, descricao, '+
        'min(datainicioplan) as "mindatainicioplan", min(datafimplan) as "mindatafimplan", min(datainicioreal) as "mindatainicioreal", min(datafimreal) as "mindatafimreal",'+
        'max(datainicioplan) as "maxdatainicioplan", max(datafimplan) as "maxdatafimplan", max(datainicioreal) as "maxdatainicioreal", max(datafimreal) as "maxdatafimreal",'+
        '(strftime("%s",max(datainicioreal)) - strftime("%s",max(datainicioplan)))/86400.0 as "inicio_real_plan",'+
        '(strftime("%s",max(datafimreal)) - strftime("%s",max(datafimplan)))/86400.0 as "fim_real_plan" '+
        'from tbdados where range = ? and linha like ? and descricao like ?',
        [request.params.range, request.params.linha, request.params.descricao], 
        (error, rows) => {
        if (error) {
            throw error;
        }
        response.status(200).json(rows);
    });
};

// retorna os tipos de range
const getDistinctRange = (request, response) => {
    bd.all(
        'select distinct range from tbdados order by range', 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.b(200).json(rows);
        }
    );
};

// retorna os tipos de linha
const getDistinctLinha = (request, response) => {
    bd.all(
        'select distinct linha from tbdados order by linha', 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna os tipos de descricao
const getDistinctDescricao = (request, response) => {
    bd.all(
        'select distinct descricao from tbdados order by descricao', 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna os tipos distintos de linha por range
const getDistinctLinhaByRange = (request, response) => {
    bd.all(
        'select distinct linha from tbdados where range = ? order by linha',
        [request.params.range], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna os tipos distintos de descricao por linha e range
const getDistinctDescricaoByRangeLinha = (request, response) => {
    bd.all(
        'select distinct descricao from tbdados where range = ? and linha = ? order by descricao',
        [request.params.range, request.params.linha], 
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

module.exports = {
    getDados,
    getByRange,
    getByLinha,
    getByRangeLinha,
    getByDescricao,
    getByRangeLinhaDescricao,

    getMinMaxByRange,
    getMinMaxByRangeLinha,
    getMinMaxByRangeLinhaDescricao,

    getDistinctRange,
    getDistinctLinha,
    getDistinctDescricao,
    getDistinctLinhaByRange,
    getDistinctDescricaoByRangeLinha
};