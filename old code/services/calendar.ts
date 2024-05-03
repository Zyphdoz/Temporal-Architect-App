/*
export interface DateAndTime {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    date?: Date;
}

export interface CalendarTask {
    title: string;
    description: string;
    category: string;
    startTime: DateAndTime;
    endTime: DateAndTime;
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
}

interface CalendarMap<T> {
    [key: string]: T;
}

class Calendar {
    private tasks: CalendarMap<CalendarTask[]> = {};

    addNewTask(task: CalendarTask) {
        const key = this.getKeyFromTask(task).toString();
        if (this.noEntryExistInMapForThisDay(key)) {
            this.createNewEntryForThisDay(key);
        }
        this.tasks[key].push(task);
        this.updateDate(task, key);
        //this.updateDuration(task);
    }

    getAllTasks() {
        return this.tasks;
    }

    clear() {
        this.tasks = {};
    }

    private getKeyFromTask(task: CalendarTask) {
        const { month, day, year } = task.startTime;
        return `${month}/${day}/${year}`;
    }

    private noEntryExistInMapForThisDay(key: string): boolean {
        return this.tasks[key] === undefined ? true : false;
    }

    private createNewEntryForThisDay(key: string) {
        this.tasks[key] = [];
    }

    private updateDate(task: CalendarTask, key: string) {
        //todo: make this return a new task with the updated date
    }
}

export const calendar = new Calendar();
*/
