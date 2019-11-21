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
                    'range text NULL,' +
                    'linha text NULL,' +
                    'posto text NULL,' +
                    'descricao text NULL,' +
                    'datainicioplan text NULL,' +
                    'datafimplan text NULL,' +
                    'datainicioreal text NULL,' +
                    'datafimreal text NULL,' +
                    'fimreal_fimplan real NULL,' +
                    'inicioreal_inicioplan real NULL,' +
                    'fimreal_inicioreal real NULL,' +
                    'fimplan_inicioplan real NULL' +
                    ')'
                );
                console.log("tbdados criada");
            }
        });
    }
});

// retorna todos os registros que possuem o range fornecido
const getByRange = (request, response) => {
    bd.all(
        'select range, linha, posto, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal, fimreal_fimplan, inicioreal_inicioplan, fimreal_inicioreal, fimplan_inicioplan ' +
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
        'select range, linha, posto, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal, fimreal_fimplan, inicioreal_inicioplan, fimreal_inicioreal, fimplan_inicioplan ' +
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


// retorna todos os registros que possuem o posto fornecido
const getByPosto = (request, response) => {
    bd.all(
        'select range, linha, posto, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal, fimreal_fimplan, inicioreal_inicioplan, fimreal_inicioreal, fimplan_inicioplan ' +
        'from tbdados where posto = ?',
        [request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem o range e o posto fornecido
const getByRangePosto = (request, response) => {
    bd.all(
        'select range, linha, posto, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal, fimreal_fimplan, inicioreal_inicioplan, fimreal_inicioreal, fimplan_inicioplan ' +
        'from tbdados where range = ? and posto = ?',
        [request.params.range, request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna todos os registros que possuem o range, linha e posto fornecido
const getByRangeLinhaPosto = (request, response) => {
    bd.all(
        'select range, linha, posto, descricao, datainicioplan, datafimplan, datainicioreal, datafimreal, fimreal_fimplan, inicioreal_inicioplan, fimreal_inicioreal, fimplan_inicioplan ' +
        'from tbdados where range = ? and linha = ? and posto = ?',
        [request.params.range, request.params.linha, request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// *************************

// retorna os tipos de range
const getDistinctRange = (request, response) => {
    bd.all(
        'select distinct range from tbdados order by range',
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
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
const getDistinctPosto = (request, response) => {
    bd.all(
        'select distinct posto from tbdados order by posto',
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// *************************

// retorna o somatório e média dos registros que possuem o range fornecido
const getStatsByRange = (request, response) => {
    bd.all(
        'select range, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
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


// retorna o somatório e média dos registros que possuem a linha fornecida
const getStatsByLinha = (request, response) => {
    bd.all(
        'select linha, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
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

// retorna o somatório e média dos registros que possuem o posto fornecido
const getStatsByPosto = (request, response) => {
    bd.all(
        'select posto, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
        'from tbdados where posto = ?',
        [request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

//retorna o somatório e média dos registros que possuem o range e posto fornecido
const getStatsByRangePosto = (request, response) => {
    bd.all(
        'select range, posto, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
        'from tbdados where range = ? and posto = ?',
        [request.params.range, request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna o somatório e média dos registros que possuem o range, linha e posto fornecido
const getStatsByRangeLinhaPosto = (request, response) => {
    bd.all(
        'select range, linha, posto, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
        'from tbdados where range = ? and linha = ? and posto = ?',
        [request.params.range, request.params.linha, request.params.posto],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};


module.exports = {
    /* LISTAR OS DADOS DISTINTOS */
    getDistinctRange,
    getDistinctLinha,
    getDistinctPosto,

    /* LISTAR OS DADOS */
    getByRange,
    getByLinha,
    getByPosto,
    getByRangePosto,
    getByRangeLinhaPosto,

    /* LISTAR AS ESTATÍSTICAS DOS DADOS */
    getStatsByRange,
    getStatsByLinha,
    getStatsByPosto,
    getStatsByRangePosto,
    getStatsByRangeLinhaPosto
};