export interface DateAndTime {
  year: string;
  month: Month;
  day: Day;
  hour: Hour;
  minute: Minute;
  date: Date;
}

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

interface CalendarMap<T> {
  [key: string]: T;
}

const tasks: CalendarMap<CalendarTask> = {};

export const calendar = {
  addTask: function (key: Date, task: CalendarTask) {
    tasks[key.toString()] = task;
  },
  getAllTasks: function () {
    return tasks;
  },
};
