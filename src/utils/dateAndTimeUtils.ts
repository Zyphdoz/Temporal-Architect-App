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
