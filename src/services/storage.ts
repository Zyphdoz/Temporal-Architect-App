import { CalendarTask, CalendarMap, calendar } from './calendar';
import { StartdayChoices, settings } from './settings';

interface SavedData {
    calendarStartDay: StartdayChoices;
    tasks: CalendarMap<CalendarTask[]>;
}

class Storage {
    calendarStartDay: StartdayChoices;
    tasks: CalendarMap<CalendarTask[]>;

    constructor() {
        let saved: SavedData | null = null;
        const savedItem = localStorage.getItem('data');
        if (savedItem !== null) {
            saved = JSON.parse(savedItem);
        }

        this.calendarStartDay = saved?.calendarStartDay || 'Today';
        this.tasks = this.repairDatesInTasks(saved?.tasks!) || {};
        settings.setCalendarStartDay(this.calendarStartDay);
    }

    save() {
        this.calendarStartDay = settings.getCalendarStartDay();
        this.tasks = calendar.getTasks();
        localStorage.setItem('data', JSON.stringify(this));
    }

    getTasks(): CalendarMap<CalendarTask[]> {
        return this.tasks;
    }

    getCalendarStartDay() {
        return this.calendarStartDay;
    }

    /**
     * the Date objects have been turned into strings in localstorage
     * in order for things to work we need to convert them back to Date objects
     */
    private repairDatesInTasks(tasks: CalendarMap<CalendarTask[]>): CalendarMap<CalendarTask[]> {
        const newTasks: CalendarMap<CalendarTask[]> = {};

        for (const date in tasks) {
            newTasks[date] = tasks[date].map((task) => ({
                ...task,
                startTime: new Date(task.startTime),
                endTime: new Date(task.endTime),
            }));
        }

        return newTasks;
    }
}

export const storage = new Storage();
