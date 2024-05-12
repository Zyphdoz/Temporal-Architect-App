import { expect, test, beforeEach } from 'vitest';
import { taskEditor } from './taskEditor';

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
