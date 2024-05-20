import { expect, test, beforeEach } from 'vitest';
import { calendar, CalendarTask } from './calendar';
import { addDays } from '../utils/dateAndTimeUtils';
import { statistics } from './statistics';

beforeEach(() => {
    calendar.clear();
});

const placeholderTask: CalendarTask = {
    title: '',
    description: 'There are no tasks for this timespan. Click here to create one.',
    category: [],
    startTime: new Date('1970/01/01'),
    endTime: addDays(new Date('1970/01/01'), 1),
    duration: 1440,
    numRepeats: 0,
    repeatMonday: false,
    repeatTuesday: false,
    repeatWednesday: false,
    repeatThursday: false,
    repeatFriday: false,
    repeatSaturday: false,
    repeatSunday: false,
    backgroundColor: '#F3F4F6',
};

test('statistics.getStats()_whenAddingTwoTasksWithDuration360andCategoryTest_shouldReturnTest12Hours', () => {
    calendar.addTask({
        ...placeholderTask,
        description: 'this task has the category test',
        startTime: new Date('05/05/2024 12:00'),
        endTime: new Date('05/05/2024 18:00'),
        duration: 360,
        category: ['test'],
    });

    calendar.addTask({
        ...placeholderTask,
        description: 'this task has the category test',
        startTime: new Date('05/05/2024 05:00'),
        endTime: new Date('05/05/2024 11:00'),
        duration: 360,
        category: ['test'],
    });

    expect(statistics.getCategoriesWithStats(new Date('05/05/2024 05:00'), new Date('05/05/2024 05:00'))).toEqual({
        ['Test']: {
            annualHours: 4382.9,
            daysPerDecade: 1826.2,
            hoursPerDecade: 43829.1,
            totalHours: 12,
            weeklyHours: 84,
        },
    });
});
