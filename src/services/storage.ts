import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CalendarTask, CalendarMap, calendar } from './calendar';
import { StartdayChoices, settings } from './settings';

interface SavedData {
    calendarStartDay: StartdayChoices;
    tasks: CalendarMap<CalendarTask[]>;
}

interface StorageDB extends DBSchema {
    data: {
        key: string;
        value: SavedData;
    };
}

class Storage {
    private dbPromise: Promise<IDBPDatabase<StorageDB>> = null!;
    private calendarStartDay: StartdayChoices = 'Today';
    private tasks: CalendarMap<CalendarTask[]> = {};
    ready: Promise<void>;

    constructor() {
        if (!this.inTestEnvironement()) {
            this.dbPromise = openDB<StorageDB>('storageDB', 1, {
                upgrade(db) {
                    db.createObjectStore('data');
                },
            });

            this.ready = this.loadData();
        } else {
            this.ready = Promise.resolve();
        }
    }

    private async loadData() {
        if (!this.dbPromise) return;
        const db = await this.dbPromise;
        const saved = await db.get('data', 'savedData');

        this.calendarStartDay = saved?.calendarStartDay || 'Today';
        this.tasks = this.repairDatesInTasks(saved?.tasks!) || {};
        settings.setCalendarStartDay(this.calendarStartDay);
    }

    async save() {
        this.calendarStartDay = await settings.getCalendarStartDay();
        this.tasks = calendar.getTasks();
        const db = await this.dbPromise;
        await db.put(
            'data',
            {
                calendarStartDay: this.calendarStartDay,
                tasks: this.tasks,
            },
            'savedData',
        );
    }

    getTasks(): CalendarMap<CalendarTask[]> {
        return this.tasks;
    }

    getCalendarStartDay(): StartdayChoices {
        return this.calendarStartDay;
    }

    async downloadBackup() {
        const db = await this.dbPromise;
        const data = await db.get('data', 'savedData');
        const dataStr = JSON.stringify(data);
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
        reader.onload = async () => {
            if (typeof reader.result === 'string') {
                try {
                    const data = JSON.parse(reader.result);
                    this.tasks = this.repairDatesInTasks(data.tasks);
                    this.calendarStartDay = data.calendarStartDay;
                    settings.setCalendarStartDay(this.calendarStartDay);
                    const db = await this.dbPromise;
                    await db.put(
                        'data',
                        {
                            calendarStartDay: this.calendarStartDay,
                            tasks: this.tasks,
                        },
                        'savedData',
                    );
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

    async deleteData() {
        const db = await this.dbPromise;
        await db.delete('data', 'savedData');
        this.tasks = {};
        this.calendarStartDay = 'Today';
        settings.setCalendarStartDay(this.calendarStartDay);
        calendar.clear();
    }

    /**
     * the Date objects have been turned into strings in storage
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

    private inTestEnvironement(): boolean {
        return typeof localStorage === 'undefined';
    }
}

export const storage = new Storage();
