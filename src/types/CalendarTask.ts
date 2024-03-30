import { DateAndTime } from './DateAndTime';

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
