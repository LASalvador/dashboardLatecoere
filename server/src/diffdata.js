const holidays = [
    new Date(2018, 0, 1).getTime(),
    new Date(2018, 1, 12).getTime(), //Carnaval
    new Date(2018, 1, 13).getTime(),
    new Date(2018, 2, 30).getTime(), //Paixão
    new Date(2018, 3, 3).getTime(), //aniversário de Jacareí
    new Date(2018, 3, 21).getTime(), //Tiradentes
    new Date(2018, 4, 1).getTime(), //Trabalho
    new Date(2018, 4, 31).getTime(), //Corpus
    new Date(2018, 6, 9).getTime(),  //9 julho
    new Date(2018, 8, 7).getTime(),  //7 setembro
    new Date(2018, 9, 12).getTime(),  //Nossa Senhora
    new Date(2018, 10, 2).getTime(),  //Finados
    new Date(2018, 10, 15).getTime(),  //Proclamação da República
    new Date(2018, 11, 25).getTime(),  //Natal

    new Date(2019, 0, 1).getTime(),
    new Date(2019, 2, 4).getTime(), //Carnaval
    new Date(2019, 2, 5).getTime(),
    new Date(2019, 3, 3).getTime(), //aniversário de Jacareí
    new Date(2019, 3, 19).getTime(), //Paixão
    new Date(2019, 3, 21).getTime(), //Tiradentes
    new Date(2019, 4, 1).getTime(), //Trabalho
    new Date(2019, 5, 20).getTime(), //Corpus
    new Date(2019, 6, 9).getTime(),  //9 julho
    new Date(2019, 8, 7).getTime(),  //7 setembro
    new Date(2019, 9, 12).getTime(),  //Nossa Senhora
    new Date(2019, 10, 2).getTime(),  //Finados
    new Date(2019, 10, 15).getTime(),  //Proclamação da República
    new Date(2019, 11, 25).getTime()  //Natal
];

const isHoliday = (date) => {
    date = date.getTime();
    for (let i = 0; i < holidays.length; i++) {
        if (holidays[i] == date) {
            return true;
        }
    }
    return false;
};


// returns the number of worked days between two dates, ignoring holidays and weekends
// counts only the start day, that is, ignores the end day
const intervalWorkedDays = (start, end) => {
    try {
        let sinal = 1;
        if( start.getTime() > end.getTime() ){
            let temp = start;
            start = end;
            end = temp;
            sinal = -1;
        }
        // ignore hous and minutes
        dateStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        dateEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        // same date
        if (dateStart.getTime() == dateEnd.getTime()) {
            return 0;
        }
        else {
            let days = 0;
            // count days without end dates
            while (dateStart.getTime() < dateEnd.getTime()) {
                if (dateStart.getDay() > 0 && dateStart.getDay() < 6 && !isHoliday(dateStart)) {
                    days++;
                }
                dateStart.setDate(dateStart.getDate() + 1);
            }
            return sinal * days;
        }
    }
    catch (error) {
        return 'NULL';
    }
};

// returns the number of worked days between two dates, ignoring holidays and weekends
// start and end days are counted
const workedDays = (start, end) => {
    try {
        let sinal = 1;
        if( start.getTime() > end.getTime() ){
            let temp = start;
            start = end;
            end = temp;
            sinal = -1;
        }
        // ignore hous and minutes
        dateStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        dateEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        // same date
        if (dateStart.getTime() == dateEnd.getTime()) {
            return 1;
        }
        else {
            let days = 0;
            // count days without end dates
            while (dateStart.getTime() <= dateEnd.getTime()) {
                if (dateStart.getDay() > 0 && dateStart.getDay() < 6 && !isHoliday(dateStart)) {
                    days++;
                }
                dateStart.setDate(dateStart.getDate() + 1);
            }
            return sinal * days;
        }
    }
    catch (error) {
        return 'NULL';
    }
};


module.exports = {
    workedDays,
    intervalWorkedDays
};

/*
let days = workedDays(new Date(2019, 11, 20, 10, 45), new Date(2019, 11, 10, 14, 30));
console.log(days);
days = workedDays(new Date(2019, 11, 20, 14, 30), new Date(2019, 11, 27, 17, 0));
console.log(days);
days = intervalWorkedDays(new Date(2019, 11, 19, 6, 0), new Date(2019, 11, 20, 15, 00));
console.log(days);
days = workedDays(new Date(2019, 11, 19, 6, 0), new Date(2019, 11, 20, 15, 00));
console.log(days);
days = intervalWorkedDays(new Date(2019, 11, 19, 6, 0), new Date(2019, 11, 19, 15, 00));
console.log(days);
days = workedDays(new Date(2019, 11, 19, 6, 0), new Date(2019, 11, 19, 15, 00));
console.log(days);
*/