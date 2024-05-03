/*

import { expect, test, beforeEach } from 'vitest';
import { calendar, CalendarTask } from './calendar';

beforeEach(() => {
    calendar.clear();
});

const testTask: CalendarTask = {
    title: 'Test Task no duration',
    description:
        'This is a test task with no duration property. It also starts before daylight savings time and ends after daylight savings time.',
    category: 'Test',
    startTime: {
        year: '2024',
        month: '03',
        day: '30',
        hour: '22',
        minute: '00',
        date: new Date('2024-03-30T22:00:00'),
    },
    endTime: {
        year: '2024',
        month: '03',
        day: '31',
        hour: '04',
        minute: '00',
        date: new Date('2024-03-31T04:00:00'),
    },
    //taskDuration: 360,
    taskId: 1,
    numRepeats: 0,
    repeatMonday: false,
    repeatTuesday: false,
    repeatWednesday: false,
    repeatThursday: false,
    repeatFriday: false,
    repeatSaturday: false,
    repeatSunday: false,
};

const testTaskNoDates: CalendarTask = {
    title: 'Test Task no date',
    description: 'This is a test task without a date property',
    category: 'Test',
    startTime: {
        year: '2024',
        month: '03',
        day: '30',
        hour: '22',
        minute: '00',
    },
    endTime: {
        year: '2024',
        month: '03',
        day: '31',
        hour: '04',
        minute: '00',
    },
    taskId: 1,
    numRepeats: 0,
    repeatMonday: false,
    repeatTuesday: false,
    repeatWednesday: false,
    repeatThursday: false,
    repeatFriday: false,
    repeatSaturday: false,
    repeatSunday: false,
};

test('calendar.addNewTask(task)_whenGivenATask_shouldAddTaskToHashMap', () => {
    calendar.addNewTask(testTask);
    const tasks = calendar.getAllTasks();
    const { year, month, day } = testTask.startTime;
    expect(tasks[`${month}/${day}/${year}`][0]).toEqual(testTask);
});

test('calendar.addNewTask(task)_whenATaskIsAdded_itShouldContainStartAndEndDates', () => {
    calendar.addNewTask(testTaskNoDates);
    const tasks = calendar.getAllTasks();
    const { year, month, day } = testTaskNoDates.startTime;
    const task = tasks[`${month}/${day}/${year}`][0];
    expect(task).toHaveProperty('startTime.date');
    expect(task).toHaveProperty('endTime.date');
    expect(task.startTime.date).toBeInstanceOf(Date);
    expect(task.endTime.date).toBeInstanceOf(Date);
});

test('calendar.addNewTask(task)_whenATaskIsAdded_theDurationShouldBeEqualToTheTimeBetweenTheStartAndEndDates', () => {
    calendar.addNewTask(testTask);
    const tasks = calendar.getAllTasks();
    const { year, month, day } = testTask.startTime;
    const task = tasks[`${month}/${day}/${year}`][0];
    if (task.startTime.date !== undefined && task.endTime.date !== undefined) {
        const duration = task.endTime.date?.getTime() - task.startTime.date?.getTime();
        expect(task.taskDuration).toEqual(duration);
    } else {
        expect(task).toHaveProperty('startTime.date');
        expect(task).toHaveProperty('endTime.date');
        expect(task.startTime.date).toBeInstanceOf(Date);
        expect(task.endTime.date).toBeInstanceOf(Date);
    }
});

*/
