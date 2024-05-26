import { addDays, dateToMmDdYyyyString, isSameDate } from '../utils/dateAndTimeUtils';
import { StartdayChoices, settings } from './settings';
import { storage } from './storage';

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

export interface CalendarMap<T> {
    [key: string]: T;
}

class Calendar {
    private tasks: CalendarMap<CalendarTask[]> = {}; //.state

    constructor() {
        this.initializeTasks();
    }

    private async initializeTasks() {
        await storage.ready;
        this.tasks = storage.getTasks();
    }

    addTask(task: CalendarTask) {
        const numberOfTasksToAdd = task.numRepeats > 1 ? task.numRepeats : 1;
        let key = dateToMmDdYyyyString(task.startTime);

        if (numberOfTasksToAdd > 1) {
            addMultipleTasks(this);
        } else {
            if (this.noEntryExistInMapForThisDay(key)) {
                this.createNewEntryForThisDay(key);
                this.tasks[key].push(this.createPlaceholderTask(new Date(key))[0]);
            }

            this.tasks[key] = this.addTaskSortAndRemoveOverlap(key, task);

            const taskCrossesMidight: boolean = !isSameDate(task.startTime, task.endTime);

            if (taskCrossesMidight) {
                splitTaskOnMidnight(this);
            }
        }

        this.tasks = this.tasks; // this assignment is necessary in order to trigger the setter that is injected by pubsubify

        function splitTaskOnMidnight(self: Calendar) {
            const startTime = task.startTime;

            const startOfNextDay = addDays(
                new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0, 0, 0),
                1,
            );

            self.tasks[key][self.tasks[key].length - 1] = {
                ...task,
                endTime: startOfNextDay,
                duration: self.getDurationInMinutes(task.startTime, startOfNextDay),
            };

            self.addTask({
                ...task,
                startTime: startOfNextDay,
                duration: self.getDurationInMinutes(startOfNextDay, task.endTime),
            });
        }

        function addMultipleTasks(self: Calendar) {
            const repeatDays: boolean[] = [
                task.repeatSunday,
                task.repeatMonday,
                task.repeatTuesday,
                task.repeatWednesday,
                task.repeatThursday,
                task.repeatFriday,
                task.repeatSaturday,
            ];
            const singleTask: CalendarTask = { ...task, numRepeats: 0 };
            let tasksAdded: number = 0;
            let date = task.startTime;
            let count: number = 0;
            while (tasksAdded < numberOfTasksToAdd) {
                const currentDay = date.getDay();
                if (repeatDays[currentDay] === true) {
                    self.addTask({
                        ...singleTask,
                        startTime: addDays(task.startTime, count),
                        endTime: addDays(task.endTime, count),
                    });
                    tasksAdded++;
                }
                count++;
                date = addDays(task.startTime, count);
            }
        }
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

    getTasks() {
        return this.tasks;
    }

    async getCalendarStartDate(date: Date) {
        const startDayPreference: StartdayChoices = await settings.getCalendarStartDay();
        const currentWeekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        let day = date;
        if (startDayPreference === 'Today' || startDayPreference === currentWeekday) {
            return day;
        } else
            while (startDayPreference !== day.toLocaleDateString('en-US', { weekday: 'long' })) {
                day = addDays(day, -1);
            }
        return day;
    }

    onUploadBackup(tasks: CalendarMap<CalendarTask[]>) {
        this.tasks = tasks;
    }

    nextUpcomingTask(): CalendarTask {
        const rightNow = new Date();
        const todaysTasks: CalendarTask[] = this.getTasksForDay(rightNow);

        for (let i = 0; i < todaysTasks.length; i++) {
            const task = todaysTasks[i];
            if (task.startTime.getTime() >= rightNow.getTime()) {
                return task;
            }
        }

        const tomorrow = addDays(rightNow, 1);
        const todaysLastTask = todaysTasks[todaysTasks.length - 1].title;
        const tomorrowsFirstTask = this.getTasksForDay(tomorrow)[0].title;

        if (todaysLastTask === tomorrowsFirstTask && this.getTasksForDay(tomorrow).length > 1) {
            return this.getTasksForDay(tomorrow)[1];
        } else {
            return this.getTasksForDay(tomorrow)[0];
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
            description: '',
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

    private addTaskSortAndRemoveOverlap(key: string, newTask: CalendarTask) {
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
