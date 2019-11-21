const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const diffdata = require('./diffdata');
const fs = require('fs');
const results = [];
const inputfile = 'datas_06nov.csv'; /* precisa ser utf-8 sem BOM */
const outputfile = 'datas_06nov - saida.csv';

fs.createReadStream(inputfile)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(function (item) {
            item.fimreal_fimplan = (item.datafimreal != 'NULL' && item.datafimplan != 'NULL') ?
                diffdata.workedHours(new Date(item.datafimreal), new Date(item.datafimplan)) :
                'NULL';

            item.inicioreal_inicioplan = (item.datainicioreal != 'NULL' && item.datainicioplan != 'NULL') ?
                diffdata.workedHours(new Date(item.datainicioreal), new Date(item.datainicioplan)) :
                'NULL';

            item.fimreal_inicioreal = (item.datafimreal != 'NULL' && item.datainicioreal != 'NULL') ?
                diffdata.workedHours(new Date(item.datainicioreal), new Date(item.datafimreal)) :
                'NULL';

            item.fimplan_inicioplan = (item.datafimplan != 'NULL' && item.datainicioplan != 'NULL') ?
                diffdata.workedHours(new Date(item.datainicioplan), new Date(item.datafimplan)) :
                'NULL';
        });
        writeCSV(results);
    });



const writeCSV = (data) => {
    const csvWriter = createCsvWriter({
        path: outputfile,
        fieldDelimiter: ';',
        header: [
            { id: 'range', title: 'range' },
            { id: 'linha', title: 'linha' },
            { id: 'posto', title: 'posto' },
            { id: 'descricao', title: 'descricao' },
            { id: 'datainicioplan', title: 'datainicioplan' },
            { id: 'datafimplan', title: 'datafimplan' },
            { id: 'datainicioreal', title: 'datainicioreal' },
            { id: 'datafimreal', title: 'datafimreal' },

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