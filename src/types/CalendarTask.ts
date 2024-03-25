import { DateAndTime } from "./DateAndTime";

export interface CalendarTask {
  title: string;
  description: string;
  category: string;
  startTime: DateAndTime;
  endTime: DateAndTime;
  repeatMonday: boolean;
  repeatTuesday: boolean;
  repeatWednesday: boolean;
  repeatThursday: boolean;
  repeatFriday: boolean;
  repeatSaturday: boolean;
  repeatSunday: boolean;
}
