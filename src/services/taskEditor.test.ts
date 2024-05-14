import { expect, test, beforeEach } from 'vitest';
import { taskEditor } from './taskEditor';
import { CalendarTask } from './calendar';

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

beforeEach(() => {
    taskEditor.clear();
});

test('taskEditor.setStartTime()_whenStartTimeIsSet_theTaskDurationShouldAlsoChange', () => {
    taskEditor.setEndTime(new Date('1971/01/01'));
    const durationBeforeStartTimeChange = taskEditor.getTask().duration;
    taskEditor.setStartTime(new Date('1970/01/01'));
    const durationAfterStartTimeChange = taskEditor.getTask().duration;
    expect(durationAfterStartTimeChange).not.toEqual(durationBeforeStartTimeChange);
});

test('taskEditor.setEndTime()_whenEndTimeIsSet_theTaskDurationShouldAlsoChange', () => {
    taskEditor.setStartTime(new Date('1970/01/01'));
    const durationBeforeEndTimeChange = taskEditor.getTask().duration;
    taskEditor.setEndTime(new Date('1971/01/01'));
    const durationAfterEndTimeChange = taskEditor.getTask().duration;
    expect(durationAfterEndTimeChange).not.toEqual(durationBeforeEndTimeChange);
});

test('taskEditor.setTask()_whenATaskIsSet_theTaskEditorShouldNotHaveErrorMessage', () => {
    taskEditor.setErrorMessage('Error: this message should have been cleared when taskEditor.setTask was called.');
    taskEditor.setTask(placeholderTask);
    expect(taskEditor.getErrorMessage()).toEqual('');
});
