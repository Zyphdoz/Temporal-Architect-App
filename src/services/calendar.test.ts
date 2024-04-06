import { expect, test } from "vitest";
import { calendar, CalendarTask } from "./calendar";

test("calendar.addTask(key, task)_whenGivenAKeyAndTask_shouldAddTask", () => {
  const task: CalendarTask = {
    title: "Test Task",
    description: "This is a test task",
    category: "Test",
    startTime: {
      year: "2024",
      month: "April",
      day: "6",
      hour: "10",
      minute: "30",
      date: new Date("2024-04-06T10:30:00"),
    },
    endTime: {
      year: "2024",
      month: "April",
      day: "6",
      hour: "11",
      minute: "30",
      date: new Date("2024-04-06T11:30:00"),
    },
    taskDuration: 60,
    taskId: 1,
    numRepeats: 0,
    repeatMonday: false,
    repeatTuesday: false,
    repeatWednesday: false,
    repeatThursday: false,
    repeatFriday: false,
    repeatSaturday: false,
    repeatSunday: false,
  };

  calendar.addTask(new Date("2024-04-06T10:30:00"), task);
  const tasks = calendar.getAllTasks();
  expect(tasks[new Date("2024-04-06T10:30:00").toString()]).toEqual(task);
});
