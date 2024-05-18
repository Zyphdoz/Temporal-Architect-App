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
    private tasks: CalendarMap<CalendarTask[]> = {}; //.state

    addTask(task: CalendarTask) {
        const key = dateToMmDdYyyyString(task.startTime);
        if (this.noEntryExistInMapForThisDay(key)) {
            this.createNewEntryForThisDay(key);
            this.tasks[key].push(this.createPlaceholderTask(new Date(key))[0]);
        }

        this.tasks[key] = this.removeOverlap(key, task)!;

        this.tasks = this.tasks; // this assignment is necessary in order to trigger the setter that is injected by pubsubify
    }

    clear() {
        this.tasks = {};
    }

    getTasksForDay(date: Date) {
        const key = dateToMmDdYyyyString(date);
        if (this.noEntryExistInMapForThisDay(key)) {
            return this.createPlaceholderTask(date);
        } else {
            return this.tasks[key];
        }
    }

    private createNewEntryForThisDay(key: string) {
        this.tasks[key] = [];
    }

    private getDurationInMinutes(start: Date, end: Date): number {
        return (end.getTime() - start.getTime()) / 1000 / 60;
    }

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
            endTime: addDays(new Date(date), 1),
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

    private removeOverlap(key: string, newTask: CalendarTask) {
        const tasks = this.tasks[key];

        let addedNewTask: boolean = false;
        let tasksWithNoOverlap: CalendarTask[] = [];
        for (let i = 0; i < tasks.length; i++) {
            const existingTask = tasks[i];

            const newTaskSplitsExistingTask =
                newTask.startTime.getTime() > existingTask.startTime.getTime() &&
                newTask.endTime.getTime() < existingTask.endTime.getTime();
            const newTaskOverlapsBeginningOfExistingTask =
                newTask.endTime.getTime() > existingTask.startTime.getTime() &&
                newTask.startTime.getTime() <= existingTask.startTime.getTime();
            const newTaskOverlapsEndOfExistingTask =
                newTask.startTime.getTime() < existingTask.endTime.getTime() &&
                newTask.endTime.getTime() >= existingTask.endTime.getTime();
            const newTaskOverlapsEntireExistingTask =
                newTaskOverlapsBeginningOfExistingTask && newTaskOverlapsEndOfExistingTask;
            const thereIsNoOverlap =
                newTask.endTime.getTime() <= existingTask.startTime.getTime() ||
                newTask.startTime.getTime() >= existingTask.endTime.getTime();
            /**
             * when a new task is added, it should overwrite any task that happens during
             * the same time period. in other words, existing tasks will shrink or if
             * necessary be removed entirely in order to make room for the new task.
             * existing tasks are split if a new task is added inside of an existing task
             * e.g. one task last from 0:00 to 10:00, then a user adds a task lasting from
             * 2:00 to 3:00. the result is one task lasting from 0:00 to 2:00, one task from
             * 2:00 to 3:00 and one task from 3:00 to 10:00
             */

            if (newTaskSplitsExistingTask) {
                tasksWithNoOverlap = [
                    ...tasksWithNoOverlap,
                    {
                        ...existingTask,
                        endTime: newTask.startTime,
                        duration: this.getDurationInMinutes(existingTask.startTime, newTask.startTime),
                    },
                    newTask,
                    {
                        ...existingTask,
                        startTime: newTask.endTime,
                        duration: this.getDurationInMinutes(newTask.endTime, existingTask.endTime),
                    },
                    ...tasks.splice(i + 1, Infinity),
                ];
                break;
            } else if (newTaskOverlapsEntireExistingTask) {
                if (!addedNewTask) {
                    tasksWithNoOverlap.push(newTask);
                    addedNewTask = true;
                }
            } else if (newTaskOverlapsBeginningOfExistingTask) {
                if (!addedNewTask) {
                    tasksWithNoOverlap.push(newTask);
                    addedNewTask = true;
                }
                tasksWithNoOverlap = [
                    ...tasksWithNoOverlap,
                    {
                        ...existingTask,
                        startTime: newTask.endTime,
                        duration: this.getDurationInMinutes(newTask.endTime, existingTask.endTime),
                    },
                ];
            } else if (newTaskOverlapsEndOfExistingTask) {
                tasksWithNoOverlap = [
                    ...tasksWithNoOverlap,
                    {
                        ...existingTask,
                        endTime: newTask.startTime,
                        duration: this.getDurationInMinutes(existingTask.startTime, newTask.startTime),
                    },
                ];
                if (!addedNewTask) {
                    tasksWithNoOverlap.push(newTask);
                    addedNewTask = true;
                }
            } else if (thereIsNoOverlap) {
                tasksWithNoOverlap.push(existingTask);
            }
        }

        return tasksWithNoOverlap;
    }
}

export const calendar = new Calendar();
