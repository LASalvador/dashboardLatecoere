// importar o módulo sqlite3
// ao definir verbose (detalhado) poderemos rastrear a pilha de execução
const sqlite3 = require('sqlite3').verbose();
// cria o BD e abre a conexão com ele, e após, dispara a função callback
const bd = new sqlite3.Database('./bdparceria.db', (error) => {
    if (error) {
        console.log(error.message);
    }
});

const getLastClosedRangeByPosto = (request, response) => {
    bd.all(
        'select range, linha, posto, max(strftime("%Y-%m-%d %H:%M:%S", datafimreal)) as "max", fimreal_fimplan ' +
        'from tbdados ' +
        'where linha = ? ' +
        'group by posto ' +
        'order by posto',
        [request.params.linha],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};



// retorna o somatório e média de uma determinada linha agrupados pelo posto
const getLinhaGroupByPosto = (request, response) => {
    bd.all(
        'select linha, posto, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
        'from tbdados '+
        'where linha = ?' +
        'group by posto',
        [request.params.linha],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna o somatório e média de uma determinada linha agrupados pelo posto e range
const getLinhaRangeGroupByPosto = (request, response) => {
    bd.all(
        'select linha, range, posto, '+ 
        'round(sum(fimreal_fimplan),2) as "sum_fimreal_fimplan", round(sum(inicioreal_inicioplan),2) as "sum_inicioreal_inicioplan", ' + 
        'round(sum(fimreal_inicioreal),2) as "sum_fimreal_inicioreal", round(sum(fimplan_inicioplan),2) as "sum_fimplan_inicioplan", ' +
        'round(avg(fimreal_fimplan),2) as "avg_fimreal_fimplan", round(avg(inicioreal_inicioplan),2) as "avg_inicioreal_inicioplan", ' + 
        'round(avg(fimreal_inicioreal),2) as "avg_fimreal_inicioreal", round(avg(fimplan_inicioplan),2) as "avg_fimplan_inicioplan" ' +
        'from tbdados '+
        'where linha = ? and range = ? ' +
        'group by posto',
        [request.params.linha, request.params.range],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

// retorna os tipos de range
const getDistinctRangeByLinha = (request, response) => {
    bd.all(
        'select distinct range '+
        'from tbdados '+
        'where linha = ? '+
        'order by range',
        [request.params.linha],
        (error, rows) => {
            if (error) {
                throw error;
            }
            response.status(200).json(rows);
        }
    );
};

module.exports = {
    getLinhaGroupByPosto,
    getLinhaRangeGroupByPosto,
    getDistinctRangeByLinha,
    getLastClosedRangeByPosto
};

