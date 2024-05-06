import { expect, test } from 'vitest';
import { addDays, dateToMmDdYyyyString } from './dateAndTimeUtils';

test('dateToMmDdYyyyString()_whenGivenADateObject_shouldReturn"mm/dd/yyyy"FormatedString', () => {
    const testDate = new Date('2013/12/26');
    expect(dateToMmDdYyyyString(testDate)).toEqual('12/26/2013');
});

test('addDays_whenAdding5daysToFebruary28th2023_shouldReturnMarch5th', () => {
    const testDate = new Date('2023/02/28');
    expect(addDays(testDate, 5).toLocaleDateString()).toEqual('05/03/2023');
});

test('addDays_whenAdding5daysToFebruary28th2024_shouldAccountForLeapyearAndReturnMarch4th', () => {
    const testDate = new Date('2024/02/28');
    expect(addDays(testDate, 5).toLocaleDateString()).toEqual('04/03/2024');
});
