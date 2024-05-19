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

    getCalendarStartDay() {
        return this.calendarStartDay;
    }

    setCalendarStartDay(day: StartdayChoices) {
        this.calendarStartDay = day;
    }
}

export const settings = new Settings();
