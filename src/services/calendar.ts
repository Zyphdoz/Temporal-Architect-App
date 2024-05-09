import { addDays, dateToMmDdYyyyString } from '../utils/dateAndTimeUtils';

export interface CalendarTask {
    title: string;
    description: string;
    category: string;
    startTime: Date;
    endTime: Date;
    taskDuration?: number;
    taskId: number;
    numRepeats: number;
    repeatMonday: boolean;
    repeatTuesday: boolean;
    repeatWednesday: boolean;
    repeatThursday: boolean;
    repeatFriday: boolean;
    repeatSaturday: boolean;
    repeatSunday: boolean;
    backgroundColor: string;
}

interface CalendarMap<T> {
    [key: string]: T;
}

class Calendar {
    private tasks: CalendarMap<CalendarTask[]> = {};

    /*
    addNewTask(task: CalendarTask) {
        const key = dateToMmDdYyyyString(task.startTime.date!);
        if (this.noEntryExistInMapForThisDay(key)) {
            this.createNewEntryForThisDay(key);
        }
        this.tasks[key].push(task);
    }

    getAllTasks() {
        return this.tasks;
    }
    */

    clear() {
        this.tasks = {};
    }

    getTasksForDay(date: Date) {
        const key = dateToMmDdYyyyString(date);
        if (this.noEntryExistInMapForThisDay(key)) {
            return this.createPlaceholderTask(date);
        } else {
            //return tasks for this day
        }
    }

    /*
    private createNewEntryForThisDay(key: string) {
        this.tasks[key] = [];
    }
    */

    private noEntryExistInMapForThisDay(key: string): boolean {
        return this.tasks[key] === undefined ? true : false;
    }

    private createPlaceholderTask(date: Date): CalendarTask[] {
        date.setHours(0, 0, 0, 0);
        const nextDate = addDays(date, 1);
        nextDate.setHours(0, 0, 0, 0);
        let placeholderTask: CalendarTask = {
            title: '',
            description: 'There are no tasks for this day. Click here to create one.',
            category: '',
            startTime: new Date(date),
            endTime: new Date(nextDate),
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
        return [placeholderTask];
    }
}

export const calendar = new Calendar();
