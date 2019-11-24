const hourDayBegin = 7, minuteDayBegin = 0, hourDayEnd = 17, minuteDayEnd = 0;
const hourLunchBegin = 12, minuteLunchBegin = 0, hourLunchEnd = 13, minuteLunchEnd = 0;
const dayWorkHours = 9; //computes day worked hours

const lunchBegin = new Date(2000, 0, 1, hourLunchBegin, minuteLunchBegin);
const lunchEnd = new Date(2000, 0, 1, hourLunchEnd, minuteLunchEnd);
const lunchInterval = lunchEnd - lunchBegin; // computes lunch interval

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

/* computes the number of worked hours in the same day */
const hoursSameDayWithLunch = (start, end) => {
    let lunchBegin = new Date(start.getFullYear(), start.getMonth(), start.getDate(), hourLunchBegin, minuteLunchBegin);

    if (start.getTime() < lunchBegin) {
        if (end.getTime() < lunchBegin) {
            // both are before lunch
            return (end.getTime() - start.getTime()) / 3600000;
        }
        else { // the begin is before lunch and the end is after lunch
            return (end.getTime() - start.getTime() - lunchInterval) / 3600000;
        }
    }
    else {
        // both are after lunch
        return (end.getTime() - start.getTime()) / 3600000;
    }
};

/* computes the number of worked hours in the start date */
const hoursStartDayWithLunch = (start) => {
    let endWorkHour = new Date(start.getFullYear(), start.getMonth(), start.getDate(), hourDayEnd, minuteDayEnd);
    let lunchBegin = new Date(start.getFullYear(), start.getMonth(), start.getDate(), hourLunchBegin, minuteLunchBegin);

    if (start.getTime() < lunchBegin) {
        return (endWorkHour.getTime() - start.getTime() - lunchInterval) / 3600000;
    }
    else { // the start is after lunch 
        return (endWorkHour.getTime() - start.getTime()) / 3600000;
    }
};

/* computes the number of worked hours in the end date */
const hoursEndDayWithLunch = (end) => {
    let beginWorkHour = new Date(end.getFullYear(), end.getMonth(), end.getDate(), hourDayBegin, minuteDayBegin);
    let lunchBegin = new Date(end.getFullYear(), end.getMonth(), end.getDate(), hourLunchBegin, minuteLunchBegin);

    if (lunchBegin < end.getTime()) {
        return (end.getTime() - beginWorkHour.getTime() - lunchInterval) / 3600000;
    }
    else { // the start is after lunch 
        return (end.getTime() - beginWorkHour.getTime()) / 3600000;
    }
};

const getHoursBeginDay = (start) => {
    let dayEnd = new Date(start.getTime());
    dayEnd.setHours(hourDayEnd);
    dayEnd.setMinutes(minuteDayEnd);
    return (dayEnd.getTime() - start.getTime()) / 3600000;
};

// returns the number of hours worked between two dates, ignoring holidays, weekends and lunch
const workedHours = (start, end) => {
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
            return sinal * hoursSameDayWithLunch(start, end);
        }
        else {
            let days = 0;
            // start in the next day
            dateStart.setDate(dateStart.getDate() + 1);
            // count days without start and end dates
            while (dateStart.getTime() < dateEnd.getTime()) {
                if (dateStart.getDay() > 0 && dateStart.getDay() < 6 && !isHoliday(dateStart)) {
                    days++;
                }
                dateStart.setDate(dateStart.getDate() + 1);
            }
            let hoursStartDay = hoursStartDayWithLunch(start);
            let hoursEndDay = hoursEndDayWithLunch(end);
            return sinal * (days * dayWorkHours + hoursStartDay + hoursEndDay);
        }
    }
    catch (error) {
        return 'NULL';
    }
};

module.exports = {
    workedHours
};


/*
let days = workedHours(new Date(2019, 11, 20, 10, 45), new Date(2019, 11, 20, 14, 30));
console.log(days);
days = workedHours(new Date(2019, 11, 20, 14, 30), new Date(2019, 11, 20, 17, 0));
console.log(days);
days = workedHours(new Date(2019, 11, 19, 6, 0), new Date(2019, 11, 27, 15, 00));
console.log(days);*/

