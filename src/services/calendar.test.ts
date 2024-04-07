import { expect, test } from 'vitest';
import { calendar, CalendarTask } from './calendar';

const testTask: CalendarTask = {
    title: 'Test Task',
    description: 'This is a test task',
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
    taskDuration: 360,
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

test('calendar.addTask(task)_whenGivenATask_shouldAddTaskToHashMap', () => {
    calendar.addTask(testTask);
    const tasks = calendar.getAllTasks();
    const { year, month, day } = testTask.startTime;
    expect(tasks[`${month}/${day}/${year}`][0]).toEqual(testTask);
});

test('calendar.getKeyFromTask_whenGivenATask_shouldReturnTaskDateAs MM/dd/yyyy string', () => {
    // @ts-ignore
    expect(calendar.getKeyFromTask(testTask)).toEqual('03/30/2024');
});
