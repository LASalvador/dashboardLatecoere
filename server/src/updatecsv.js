const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const diffdata = require('./diffdata');
const fs = require('fs');
const results = [];
const inputfile = 'datas_14nov.csv'; /* precisa ser utf-8 sem BOM */
const outputfile = 'datas_14nov - saida.csv';

fs.createReadStream(inputfile)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(function (item) {
            item.fimreal_fimplan = (item.DataFimReal != 'NULL' && item.DataFimPlan != 'NULL') ?
                diffdata.intervalWorkedDays(new Date(item.DataFimReal), new Date(item.DataFimPlan)) :
                'NULL';

            item.inicioreal_inicioplan = (item.DataInicioReal != 'NULL' && item.DataInicioPlan != 'NULL') ?
                diffdata.intervalWorkedDays(new Date(item.DataInicioReal), new Date(item.DataInicioPlan)) :
                'NULL';

            item.fimreal_inicioreal = (item.DataFimReal != 'NULL' && item.DataInicioReal != 'NULL') ?
                diffdata.workedDays(new Date(item.DataInicioReal), new Date(item.DataFimReal)) :
                'NULL';

            item.fimplan_inicioplan = (item.DataFimPlan != 'NULL' && item.DataInicioPlan != 'NULL') ?
                diffdata.workedDays(new Date(item.DataInicioPlan), new Date(item.DataFimPlan)) :
                'NULL';
        });
        writeCSV(results);
    });



const writeCSV = (data) => {
    const csvWriter = createCsvWriter({
        path: outputfile,
        fieldDelimiter: ';',
        header: [
            { id: 'Range', title: 'range' },
            { id: 'Linha', title: 'linha' },
            { id: 'Descricao', title: 'descricao' },
            { id: 'Posto', title: 'posto' },
            { id: 'DataInicioPlan', title: 'datainicioplan' },
            { id: 'DataFimPlan', title: 'datafimplan' },
            { id: 'DataInicioReal', title: 'datainicioreal' },
            { id: 'DataFimReal', title: 'datafimreal' },

            { id: 'fimreal_fimplan', title: 'fimreal_fimplan' },
            { id: 'inicioreal_inicioplan', title: 'inicioreal_inicioplan' },
            { id: 'fimreal_inicioreal', title: 'fimreal_inicioreal' },
            { id: 'fimplan_inicioplan', title: 'fimplan_inicioplan' },
        ]
    });

    csvWriter.writeRecords(data)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
};