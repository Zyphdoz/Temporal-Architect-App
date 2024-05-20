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

        let savedItem;

        if (typeof localStorage === 'undefined') {
            savedItem = {};
        } else {
            savedItem = localStorage.getItem('data');
            if (savedItem !== null) {
                saved = JSON.parse(savedItem);
            }
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

    downloadBackup() {
        const dataStr = localStorage.getItem('data');
        const blob = new Blob([dataStr || ''], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'temporal_architect_data_backup.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    uploadBackup(file: File) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                try {
                    const data = JSON.parse(reader.result);
                    this.tasks = this.repairDatesInTasks(data.tasks);
                    this.calendarStartDay = data.calendarStartDay;
                    settings.setCalendarStartDay(this.calendarStartDay);
                    localStorage.setItem('data', JSON.stringify(this));
                    calendar.onUploadBackup(this.tasks);
                } catch (e) {
                    console.error('Invalid file content', e);
                }
            }
        };
        reader.onerror = () => {
            console.error('FileReader error', reader.error);
        };
        reader.readAsText(file);
    }

    deleteData() {
        localStorage.removeItem('data');
        this.tasks = {};
        this.calendarStartDay = 'Today';
        settings.setCalendarStartDay(this.calendarStartDay);
        calendar.clear();
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
