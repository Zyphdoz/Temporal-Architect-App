import { expect, test, beforeEach } from 'vitest';
import { calendar, CalendarTask } from './calendar';
import { dateToHhMmIn24hFormat } from '../utils/dateAndTimeUtils';

beforeEach(() => {
    calendar.clear();
});

const placeholderTask: CalendarTask = {
    title: '',
    description: 'No tasks have been set for this day. Click here to add a new task.',
    category: [],
    startTime: new Date('1970/01/01'),
    endTime: new Date('1970/01/01'),
    duration: 1440,
    numRepeats: 0,
    repeatMonday: false,
    repeatTuesday: false,
    repeatWednesday: false,
    repeatThursday: false,
    repeatFriday: false,
    repeatSaturday: false,
    repeatSunday: false,
    backgroundColor: '#c1c1c1',
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

test('calendar.dateToHhMmIn24hFormat()_whenDateHasNoTasks_placeholderTaskShouldHaveHoursAndMinutesSetTo00:00', () => {
    const returnValue: CalendarTask[] = calendar.getTasksForDay(new Date('05/03/2023 0:45'))!;
    expect(dateToHhMmIn24hFormat(returnValue[0].startTime)).toEqual('00:00');
});

test('calendar.addTask()_whenAddingTaskToADateThatHasNoTask_shouldCreateEntryInMapAndAddTheTask', () => {
    calendar.addTask(placeholderTask);
    const task = calendar.getTasksForDay(new Date('1970/01/01'))[0];
    expect(task).toEqual(placeholderTask);
});
