export interface DateAndTime {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    date: Date;
}

export interface CalendarTask {
    title: string;
    description: string;
    category: string;
    startTime: DateAndTime;
    endTime: DateAndTime;
    taskDuration: number;
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

    addTask(task: CalendarTask) {
        const key = this.getKeyFromTask(task).toString();
        if (!this.tasks[key]) {
            this.tasks[key] = [];
        }
        this.tasks[key].push(task);
    }

    getAllTasks() {
        return this.tasks;
    }

    private getKeyFromTask(task: CalendarTask) {
        const { month, day, year } = task.startTime;
        return `${month}/${day}/${year}`;
    }
}

export const calendar = new Calendar();
