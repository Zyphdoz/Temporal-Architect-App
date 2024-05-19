import { CalendarTask, CalendarMap, calendar } from './calendar';

type StartdayChoices = 'Today' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

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

        this.calendarStartDay = saved?.calendarStartDay || 'Monday';
        this.tasks = this.repairDatesInTasks(saved?.tasks!) || {};
    }

    save() {
        this.tasks = calendar.getTasks();
        localStorage.setItem('data', JSON.stringify(this));
    }

    getTasks(): CalendarMap<CalendarTask[]> {
        return this.tasks;
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
