import { dateDiffInMinutes } from '../utils/dateAndTimeUtils';
import { CalendarTask } from './calendar';

class TaskEditor {
    private taskEditorIsVisible = false; //.state
    //prettier-ignore
    private task: CalendarTask = { //.state
        title: '',
        description: '',
        category: [],
        startTime: new Date(),
        endTime: new Date(),
        duration: 0,
        numRepeats: 0,
        repeatMonday: false,
        repeatTuesday: false,
        repeatWednesday: false,
        repeatThursday: false,
        repeatFriday: false,
        repeatSaturday: false,
        repeatSunday: false,
        backgroundColor: '',
    };

    clear() {
        this.taskEditorIsVisible = false;
        this.task = {
            title: '',
            description: '',
            category: [],
            startTime: new Date(),
            endTime: new Date(),
            duration: 0,
            numRepeats: 0,
            repeatMonday: false,
            repeatTuesday: false,
            repeatWednesday: false,
            repeatThursday: false,
            repeatFriday: false,
            repeatSaturday: false,
            repeatSunday: false,
            backgroundColor: '',
        };
    }

    setTask(task: CalendarTask) {
        this.task = task;
    }

    getTask() {
        return this.task;
    }

    setTitle(title: string) {
        this.task = { ...this.task, title: title };
    }

    setDescription(description: string) {
        this.task = { ...this.task, description: description };
    }

    setCategory(categories: string) {
        const category: string[] = categories.split(',');
        this.task = { ...this.task, category: category };
    }

    setStartTime(date: Date) {
        this.task.startTime = date;
        this.setDuration();
    }

    setEndTime(date: Date) {
        this.task.endTime = date;
        this.setDuration();
    }

    private setDuration() {
        this.task = { ...this.task, duration: dateDiffInMinutes(this.task.startTime, this.task.endTime) };
    }

    setRepeats(repeats: number) {
        this.task = { ...this.task, numRepeats: repeats };
    }

    toggleRepeatMonday() {
        this.task = { ...this.task, repeatMonday: !this.task.repeatMonday };
    }

    toggleRepeatTuesday() {
        this.task = { ...this.task, repeatTuesday: !this.task.repeatTuesday };
    }

    toggleRepeatWednesday() {
        this.task = { ...this.task, repeatWednesday: !this.task.repeatWednesday };
    }

    toggleRepeatThursday() {
        this.task = { ...this.task, repeatThursday: !this.task.repeatThursday };
    }

    toggleRepeatFriday() {
        this.task = { ...this.task, repeatFriday: !this.task.repeatFriday };
    }

    toggleRepeatSaturday() {
        this.task = { ...this.task, repeatSaturday: !this.task.repeatSaturday };
    }

    toggleRepeatSunday() {
        this.task = { ...this.task, repeatSunday: !this.task.repeatSunday };
    }

    setColor(color: string) {
        this.task = { ...this.task, backgroundColor: color };
    }

    isVisible() {
        return this.taskEditorIsVisible;
    }

    open() {
        this.taskEditorIsVisible = true;
    }

    close() {
        this.taskEditorIsVisible = false;
    }
}

export const taskEditor = new TaskEditor();
