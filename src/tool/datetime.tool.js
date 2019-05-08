
export default class DatetimeTool {

    static getCurrentTimestamp() {
        return this.toTimestamp(new Date());
    }

    static toTimestamp(date) {
        return date.getFullYear() + '-' +
            date.toLocaleString(undefined, { month: '2-digit'}) + '-' +
            date.toLocaleString(undefined, { day: '2-digit'}) + ' ' +
            date.toLocaleString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
    }

    static toStringDate(date) {
        return date.toLocaleString(undefined, { day: '2-digit'}) + '/' +
            date.toLocaleString(undefined, { month: '2-digit'}) + '/' +
            date.getFullYear();

    }
    
    static toInt(date) {
        return date.getFullYear() +
            date.toLocaleString(undefined, { month: '2-digit'}) +
            date.toLocaleString(undefined, { day: '2-digit'});
    }

    static numberToTimestamp(numberTimestamp) {
        let year = Math.floor(numberTimestamp / 1e10);
        let month = Math.floor((numberTimestamp - year * 1e10) / 1e8) - 1;
        let day = Math.floor((numberTimestamp - year * 1e10 - (month + 1) * 1e8) / 1e6);
        let hour = Math.floor((numberTimestamp - year * 1e10 - (month + 1) * 1e8 - day * 1e6) / 1e4);
        let minutes = Math.floor((numberTimestamp - year * 1e10 - (month + 1) * 1e8 - day * 1e6 - hour * 1e4) / 1e2);
        let seconds = Math.floor(numberTimestamp - year * 1e10 - (month + 1) * 1e8 - day * 1e6 - hour * 1e4 - minutes * 1e2);
        return new Date(year, month, day, hour, minutes, seconds);
    }

    static addDays(date, days) {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    static getTodayTimeframe() {
        let today = new Date();
        let beginDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        let endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        return [
            beginDate,
            endDate
        ];
    }

    static getWeekTimeframe() {
        let today = new Date();
        let difference = today.getDay() === 0 ? 7 : today.getDay();
        let beginDate = this.addDays(today, -difference + 1);
        let endDate = this.addDays(beginDate, 6);
        beginDate = new Date(beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate(), 0, 0, 0);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);
        endDate = new Date();
        return [
            beginDate,
            endDate
        ];
    }

    static getMonthTimeframe() {
        let today = new Date();
        let beginDate = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
        let endDate = new Date(today.getFullYear(), today.getMonth(), 1, 23, 59, 59);
        endDate.setMonth(beginDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59);
        endDate = new Date();
        return [
            beginDate,
            endDate
        ];
    }

    static getYearTimeframe() {
        let today = new Date();
        let beginDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
        let endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
        endDate = new Date();
        return [
            beginDate,
            endDate
        ];
    }

    static inputDateToDate(inputDate) {
        let splitDate = inputDate.split('-');
        return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    }

    static dateToInputDate(date) {
        return date.getFullYear() + '-' +
            date.toLocaleString(undefined, { month: '2-digit'}) + '-' +
            date.toLocaleString(undefined, { day: '2-digit'});
    }
}
