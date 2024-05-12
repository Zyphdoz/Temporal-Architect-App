import { addDays, dateToMmDdYyyyString } from '../utils/dateAndTimeUtils';

export interface CalendarTask {
    title: string;
    description: string;
    category: string[];
    startTime: Date;
    endTime: Date;
    duration: number;
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
        let placeholderTask: CalendarTask = {
            title: '',
            description: 'There are no tasks for this timespan. Click here to create one.',
            category: [],
            startTime: new Date(date),
            endTime: new Date(date),
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
        return [placeholderTask];
    }
}

export const calendar = new Calendar();
