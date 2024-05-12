export function dateToMmDdYyyyString(date: Date): string {
    return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
}

export function addDays(date: Date, days: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function dateToHhMmIn24hFormat(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let hoursString = hours < 10 ? '0' + hours : hours;
    let minutesString = minutes < 10 ? '0' + minutes : minutes;

    return hoursString + ':' + minutesString;
}

export function isSameDate(date1: Date, date2: Date): boolean {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}

export function getMonthName(date: Date): string {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return monthNames[date.getMonth()];
}

export function getShortWeekday(date: Date): string {
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdayNames[date.getDay()];
}

export function dateDiffInMinutes(date1: Date, date2: Date): number {
    const diffInMs = date2.getTime() - date1.getTime();
    return diffInMs / (1000 * 60);
}
