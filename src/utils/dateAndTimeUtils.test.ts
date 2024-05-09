import { expect, test } from 'vitest';
import {
    addDays,
    dateToMmDdYyyyString,
    dateToHhMmIn24hFormat,
    isSameDate,
    getMonthName,
    getShortWeekday,
} from './dateAndTimeUtils';

test('dateToMmDdYyyyString(Date)_whenGivenADateObject_shouldReturn"mm/dd/yyyy"FormatedString', () => {
    const testDate = new Date('2013/12/26');
    expect(dateToMmDdYyyyString(testDate)).toEqual('12/26/2013');
});

test('dateToHhMmIn24hFormat(Date)_whenGivenADateObject_shouldReturn"hh:mm"FormatedString', () => {
    const testDate = new Date('05/03/2023 0:45');
    expect(dateToHhMmIn24hFormat(testDate)).toEqual('00:45');
});

test('addDays_whenAdding5daysToFebruary28th2023_shouldReturnMarch5th', () => {
    const testDate = new Date('2023/02/28');
    expect(addDays(testDate, 5).toLocaleDateString()).toEqual('05/03/2023');
});

test('addDays_whenAdding5daysToFebruary28th2024_shouldAccountForLeapyearAndReturnMarch4th', () => {
    const testDate = new Date('2024/02/28');
    expect(addDays(testDate, 5).toLocaleDateString()).toEqual('04/03/2024');
});

test('isSameDate()_whenDatesAreSameButTimeIsDifferent_shouldReturnTrue', () => {
    const date1 = new Date(2024, 11, 24, 11, 59, 59);
    const date2 = new Date(2024, 11, 24, 23, 59, 59);
    expect(isSameDate(date1, date2)).toEqual(true);
});

test('isSameDate()_whenDatesAreDifferent_shouldReturnFalse', () => {
    const date1 = new Date(2024, 11, 24, 11, 59, 59);
    const date2 = new Date(2024, 10, 24, 23, 59, 59);
    expect(isSameDate(date1, date2)).toEqual(false);
});

test('getMonthName()_whenCalledWithEachMonth_shouldReturnFullEnglishMonthName', () => {
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

    monthNames.forEach((monthName, index) => {
        const date = new Date(2024, index, 1);
        expect(getMonthName(date)).toEqual(monthName);
    });
});

test('getShortWeekday()_whenCalledWithEachDay_shouldReturnShortEnglishWeekdayName', () => {
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    weekdayNames.forEach((weekdayName, index) => {
        const date = new Date(2024, 0, index); // new Date(2024, 0, 0) is Sun Dec 31 2023
        expect(getShortWeekday(date)).toEqual(weekdayName);
    });
});
