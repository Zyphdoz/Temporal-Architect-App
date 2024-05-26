import { storage } from './storage';

export type StartdayChoices =
    | 'Today'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

class Settings {
    private calendarStartDay: StartdayChoices = 'Monday';

    async getCalendarStartDay() {
        await storage.ready;
        return this.calendarStartDay;
    }

    getCalendarStartDaySync() {
        return this.calendarStartDay;
    }

    setCalendarStartDay(day: StartdayChoices) {
        this.calendarStartDay = day;
    }
}

export const settings = new Settings();
