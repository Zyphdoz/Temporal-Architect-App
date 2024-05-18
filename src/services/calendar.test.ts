import { expect, test, beforeEach } from 'vitest';
import { calendar, CalendarTask } from './calendar';
import { dateToHhMmIn24hFormat, addDays } from '../utils/dateAndTimeUtils';

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

test('calendar.getTasksForDay(mm/dd/yyyy)_whenDateHasNoTasks_shouldReturnPlaceholderTaskThatLastsTheEntireDay', () => {
    const returnValue: CalendarTask[] = calendar.getTasksForDay(new Date('1970/01/01'))!;
    expect(returnValue[0].startTime).toEqual(placeholderTask.startTime);
    expect(returnValue[0].endTime).toEqual(placeholderTask.endTime);
    expect(returnValue[0].duration).toEqual(placeholderTask.duration);
});

test('calendar.getTasksForDay(mm/dd/yyyy)_whenDateHasNoTasks_shouldNotReturnUndefined', () => {
    const returnValue: CalendarTask[] | undefined = calendar.getTasksForDay(new Date('1970/01/01'));
    expect(returnValue).toBeDefined();
});

test('calendar.dateToHhMmIn24hFormat()_whenDateHasNoTasks_placeholderTaskStartTimeShouldHaveHoursAndMinutesSetTo00:00', () => {
    const returnValue: CalendarTask[] = calendar.getTasksForDay(new Date('05/03/2023 0:45'))!;
    expect(dateToHhMmIn24hFormat(returnValue[0].startTime)).toEqual('00:00');
});

test('calendar.addTask()_whenAddingTaskToADateThatHasNoTask_shouldCreateEntryInMapAndAddTheTask', () => {
    calendar.addTask(placeholderTask);
    const task = calendar.getTasksForDay(new Date('1970/01/01'))[0];

    expect(task).toEqual(placeholderTask);
});

test('calendar.addTask()_whenATaskIsAdded_theDurationOfAllTasksForThatDayShouldBe1440', () => {
    let totalDuration = 0;
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 0:45'),
        endTime: new Date('05/03/2023 6:45'),
        duration: 360,
    });
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 3:45'),
        endTime: new Date('05/03/2023 4:45'),
        duration: 60,
    });
    calendar.getTasksForDay(new Date('05/03/2023')).forEach((task: CalendarTask) => {
        totalDuration += task.duration;
    });
    expect(totalDuration).toEqual(1440);
});

test('calendar.addTask()_whenATaskIsAdded_theTasksForThatDayShouldBeSortedByEarliestFirst', () => {
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 10:45'),
        endTime: new Date('05/03/2023 16:45'),
        duration: 360,
    });
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 0:45'),
        endTime: new Date('05/03/2023 6:45'),
        duration: 360,
    });
    let previousTaskStartTime: Date;
    calendar.getTasksForDay(new Date('05/03/2023')).forEach((task: CalendarTask) => {
        if (previousTaskStartTime) {
            expect(task.startTime.getTime()).toBeGreaterThan(previousTaskStartTime.getTime());
        }
        previousTaskStartTime = task.startTime;
    });
});

test('calendar.addTask()_whenATaskIsAdded_thereShouldNotBeOverlappingTasks', () => {
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 10:45'),
        endTime: new Date('05/03/2023 16:45'),
        duration: 360,
    });
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 11:45'),
        endTime: new Date('05/03/2023 12:45'),
        duration: 60,
    });
    let previousTaskStartTime: Date;
    let previousTaskEndTime: Date;
    calendar.getTasksForDay(new Date('05/03/2023')).forEach((task: CalendarTask) => {
        if (previousTaskStartTime && previousTaskEndTime) {
            expect(task.startTime.getTime()).toBeGreaterThanOrEqual(previousTaskEndTime.getTime());
        }
        previousTaskStartTime = task.startTime;
        previousTaskEndTime = task.endTime;
    });
});

test('calendar.addTask()_whenAddFirstTaskAt02:00-03:00_thereShouldBeThreeTasks 00:00-02:00, 02:00-03:00, 03:00-00:00', () => {
    calendar.addTask({
        ...placeholderTask,
        startTime: new Date('05/03/2023 02:00'),
        endTime: new Date('05/03/2023 03:00'),
        duration: 60,
    });
    const tasks = calendar.getTasksForDay(new Date('05/03/2023'));
    expect(tasks).toHaveLength(3);
    expect(dateToHhMmIn24hFormat(tasks[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasks[0].endTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].startTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].endTime)).toEqual('03:00');
    expect(dateToHhMmIn24hFormat(tasks[2].startTime)).toEqual('03:00');
    expect(dateToHhMmIn24hFormat(tasks[2].endTime)).toEqual('00:00');
});

test('calendar.addTask()_whenAddFirstTaskAt02:00-04:00thenAddSecondTaskAt03:00-05:00_thereShouldBeFourTasks 00:00-02:00, 02:00-03:00, 03:00-05:00, 05:00-00:00', () => {
    calendar.addTask({
        ...placeholderTask,
        title: 'this task was added first',
        startTime: new Date('05/03/2023 02:00'),
        endTime: new Date('05/03/2023 04:00'),
        duration: 120,
    });
    let tasks = calendar.getTasksForDay(new Date('05/03/2023'));
    expect(dateToHhMmIn24hFormat(tasks[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasks[0].endTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].startTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].endTime)).toEqual('04:00');
    expect(dateToHhMmIn24hFormat(tasks[2].startTime)).toEqual('04:00');
    expect(dateToHhMmIn24hFormat(tasks[2].endTime)).toEqual('00:00');

    calendar.addTask({
        ...placeholderTask,
        title: 'this task was added second',
        startTime: new Date('05/03/2023 03:00'),
        endTime: new Date('05/03/2023 05:00'),
        duration: 120,
    });
    tasks = calendar.getTasksForDay(new Date('05/03/2023'));
    expect(tasks).toHaveLength(4);

    expect(dateToHhMmIn24hFormat(tasks[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasks[0].endTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].startTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[1].endTime)).toEqual('03:00');
    expect(dateToHhMmIn24hFormat(tasks[2].startTime)).toEqual('03:00');
    expect(dateToHhMmIn24hFormat(tasks[2].endTime)).toEqual('05:00');
    expect(dateToHhMmIn24hFormat(tasks[3].startTime)).toEqual('05:00');
    expect(dateToHhMmIn24hFormat(tasks[3].endTime)).toEqual('00:00');
});

test('calendar.addTask()_whenAddFirstTaskAt01:00-02:00thenAddSecondTaskAt15:00-16:00_thereShouldBeFiveTasks 00:00-01:00, 01:00-02:00, 02:00-15:00, 15:00-16:00, 16:00-00:00', () => {
    calendar.addTask({
        ...placeholderTask,
        title: 'this task was added first',
        startTime: new Date('05/03/2023 01:00'),
        endTime: new Date('05/03/2023 02:00'),
        duration: 60,
    });
    let tasks = calendar.getTasksForDay(new Date('05/03/2023'));
    expect(dateToHhMmIn24hFormat(tasks[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasks[0].endTime)).toEqual('01:00');
    expect(dateToHhMmIn24hFormat(tasks[1].startTime)).toEqual('01:00');
    expect(dateToHhMmIn24hFormat(tasks[1].endTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[2].startTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[2].endTime)).toEqual('00:00');

    calendar.addTask({
        ...placeholderTask,
        title: 'this task was added second',
        startTime: new Date('05/03/2023 15:00'),
        endTime: new Date('05/03/2023 16:00'),
        duration: 60,
    });
    tasks = calendar.getTasksForDay(new Date('05/03/2023'));
    expect(tasks).toHaveLength(5);

    expect(dateToHhMmIn24hFormat(tasks[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasks[0].endTime)).toEqual('01:00');
    expect(dateToHhMmIn24hFormat(tasks[1].startTime)).toEqual('01:00');
    expect(dateToHhMmIn24hFormat(tasks[1].endTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[2].startTime)).toEqual('02:00');
    expect(dateToHhMmIn24hFormat(tasks[2].endTime)).toEqual('15:00');
    expect(dateToHhMmIn24hFormat(tasks[3].startTime)).toEqual('15:00');
    expect(dateToHhMmIn24hFormat(tasks[3].endTime)).toEqual('16:00');
    expect(dateToHhMmIn24hFormat(tasks[4].startTime)).toEqual('16:00');
    expect(dateToHhMmIn24hFormat(tasks[4].endTime)).toEqual('00:00');
});

test('calendar.addTask()_whenAddedTaskCrossesMidnight_taskShouldBeSplitIntoNewTasksForEachDay', () => {
    calendar.addTask({
        ...placeholderTask,
        description: 'this task crosses midnight',
        startTime: new Date('05/03/2023 15:00'),
        endTime: new Date('06/03/2023 16:00'),
        duration: 1500,
    });
    const tasksFirstDay = calendar.getTasksForDay(new Date('05/03/2023'));
    const tasksSecondDay = calendar.getTasksForDay(new Date('06/03/2023'));

    expect(tasksFirstDay).toHaveLength(2);
    expect(dateToHhMmIn24hFormat(tasksFirstDay[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasksFirstDay[0].endTime)).toEqual('15:00');
    expect(dateToHhMmIn24hFormat(tasksFirstDay[1].startTime)).toEqual('15:00');
    expect(dateToHhMmIn24hFormat(tasksFirstDay[1].endTime)).toEqual('00:00');
    expect(tasksFirstDay[1].description).toEqual('this task crosses midnight');
    expect(tasksSecondDay).toHaveLength(2);
    expect(dateToHhMmIn24hFormat(tasksSecondDay[0].startTime)).toEqual('00:00');
    expect(dateToHhMmIn24hFormat(tasksSecondDay[0].endTime)).toEqual('16:00');
    expect(dateToHhMmIn24hFormat(tasksSecondDay[1].startTime)).toEqual('16:00');
    expect(dateToHhMmIn24hFormat(tasksSecondDay[1].endTime)).toEqual('00:00');
    expect(tasksSecondDay[0].description).toEqual('this task crosses midnight');
});
