import { expect, test, beforeEach } from 'vitest';
import { calendar, CalendarTask } from './calendar';

beforeEach(() => {
    calendar.clear();
});

const placeholderTask: CalendarTask = {
    title: '',
    description: 'No tasks have been set for this day. Click here to add a new task.',
    category: '',
    startTime: new Date('1970/01/01'),
    endTime: new Date('1970/01/02'),
    taskDuration: 1440,
    taskId: 1,
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
    const returnValue: CalendarTask = calendar.getTasksForDay(new Date('1970/01/01'))!;
    expect(returnValue.startTime).toEqual(placeholderTask.startTime);
    expect(returnValue.endTime).toEqual(placeholderTask.endTime);
    expect(returnValue.taskDuration).toEqual(placeholderTask.taskDuration);
});

test('calendar.getTasksForDay(mm/dd/yyyy)_whenDateHasNoTasks_shouldNotReturnUndefined', () => {
    const returnValue: CalendarTask | undefined = calendar.getTasksForDay(new Date('1970/01/01'));
    expect(returnValue).toBeDefined();
});
