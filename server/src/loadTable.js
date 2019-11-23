// importar o módulo sqlite3
// ao definir verbose (detalhado) poderemos rastrear a pilha de execução
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser')
const fs = require('fs');

const inputfile = 'datas_14nov - saida.csv'; /* precisa ser utf-8 sem BOM */

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
            else {
                if (row == undefined) {
                    bd.run(
                        'create table if not exists tbdados(' +
                            'range text NULL,' +
                            'linha text NULL,' +
                            'descricao text NULL,' +
                            'posto text NULL,' +
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
                const results = [];
                // ler os arquivo CSV e carregar na tbdados
                fs.createReadStream(inputfile)
                    .pipe(csv({ separator: ';' }))
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        let stmt = bd.prepare("insert into tbdados values(?,?,?,?,?,?,?,?,?,?,?,?)");
                        results.forEach(function (item) {
                            stmt.run(item.range.trim(), item.linha.trim(), item.descricao.trim(), item.posto.trim(), 
                                item.datainicioplan.trim(), item.datafimplan.trim(), item.datainicioreal.trim(), item.datafimreal.trim(),
                                item.fimreal_fimplan, item.inicioreal_inicioplan, item.fimreal_inicioreal, item.fimplan_inicioplan  );
                        });
                        stmt.finalize();
                        console.log("Registros carregados");
                    });
            }
        });
    }
});