import { useState } from "react";
import { CalendarTask } from "./types/CalendarTask";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime, Day, Minute, Hour, Month } from "./types/DateAndTime";
import "./styles/Calendar.css";

export default function Calendar({
  calendarTasks,
}: {
  calendarTasks: CalendarTask[];
}) {
  const [dayLabels, setDayLabels] = useState<Date[]>(
    initializeWithSevenNextDays()
  );

  const [selectedTask, setSelectedTask] = useState<CalendarTask>();

  function handleDateTimePickerStateChange(event: DateAndTime) {
    setDayLabels(() => {
      let newDates = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(event.date);
        date.setDate(date.getDate() + i);
        newDates.push(date);
      }
      return newDates;
    });
  }

  function handleUserClickedOnCalendarTask(taskId: number) {
    const selectedTask = getCalendarTaskById(taskId);
    setSelectedTask(selectedTask);
  }

  function handleClickEditSelectedTaskButton() {}

  function getCalendarTaskById(id: number): NonNullable<CalendarTask> {
    const task = calendarTasks.find((task) => task.taskId === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  function insertSelectedTask() {
    if (!selectedTask) return;

    const html = (
      <div
        className="CalendarEventContainer"
        style={{
          height: `fitContent`,
          minHeight: `fitContentx`,
        }}
      >
        <div>
          {selectedTask.startTime.date
            .toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/,/g, "")}
          <br />
          {selectedTask.endTime.date
            .toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/,/g, "")}
          <br />
          <div className="CalendarTaskTitle">
            {selectedTask.title}</div>
          <br />
          <div className="CalendarTaskDescription">
            {selectedTask.description}
          </div>
        </div>
      </div>
    );
    return html;
  }

  function initializeWithSevenNextDays() {
    const newDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      newDates.push(date);
    }
    return newDates;
  }

  function hourLabel() {
    let html = [];
    for (let i = 0; i < 24; i++) {
      html.push(
        <div className="HourLabel" key={`HourLabel${i}`}>
          {i}:00
        </div>
      );
    }
    return html;
  }

  function dayLabel() {
    let html = [];
    for (let i = 0; i < 7; i++) {
      html.push(
        <div className="DayLabel" key={`DayLabel${i}`}>
          {dayLabels[i].toDateString()}
        </div>
      );
    }
    return html;
  }

  function calendarDayColumn() {
    let html = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = dayLabels[i];
      html.push(
        <div className="CalendarDayColumn" key={`CalendarDayColumn${i}`}>
          {insertCalendarEvent(currentDay)}
        </div>
      );
    }
    return html;
  }

  function insertCalendarEvent(currentDay: Date) {
    let html = [];
    const todaysTasks = getSortedTasksForThisDate(currentDay);
    let previousTaskStartTime = { hour: "00", minute: "00" };

    const hourHeightInPixels: number = 37;
    const heightOfCalendarEventContainerMarginTopPlusBottom: number = 2;

    for (let i = 0; i < todaysTasks.length; i++) {
      const { title, taskDuration, startTime, endTime, taskId, description } =
        todaysTasks[i];
      let duration: string = `${startTime.hour}:${startTime.minute}-${endTime.hour}:${endTime.minute}`;
      let taskHeight: number = (taskDuration / 3600000) * hourHeightInPixels;

      const hoursSincePreviousTask = getHoursBetween(
        previousTaskStartTime,
        startTime
      );

      const heightOfFillerDiv: number =
        hoursSincePreviousTask * hourHeightInPixels +
        hoursSincePreviousTask *
          heightOfCalendarEventContainerMarginTopPlusBottom;

      // calculate correct task height for tasks that span across midnight
      if (taskCrossesMidnight(todaysTasks[i])) {
        if (thisIsTheFirstDayOfTheTask(startTime, currentDay)) {
          taskHeight =
            getHoursToMidnight(startTime) *
            (hourHeightInPixels +
              heightOfCalendarEventContainerMarginTopPlusBottom);
          if (hoursSincePreviousTask > 0) {
            // insert invisible div to fill up the empty space before the task,
            html.push(fillerDiv(heightOfFillerDiv, i));
          }
        } else if (thisIsTheLastDayOfTheTask(endTime, currentDay)) {
          taskHeight =
            getHoursSinceMidnight(endTime) *
            (hourHeightInPixels +
              heightOfCalendarEventContainerMarginTopPlusBottom);
        } else {
          // task spans the entire day
          taskHeight =
            24 *
            (hourHeightInPixels +
              heightOfCalendarEventContainerMarginTopPlusBottom);
        }
      } else if (hoursSincePreviousTask > 0) {
        // insert invisible div to fill up the empty space before the task,
        html.push(fillerDiv(heightOfFillerDiv, i));
      }

      html.push(
        <div
          className="CalendarEventContainer"
          onClick={() => handleUserClickedOnCalendarTask(taskId)}
          style={{
            height: `${taskHeight}px`,
            minHeight: `${taskHeight}px`,
          }}
          key={`CalendarEventContainer${i}`}
        >
          <div className="CalendarEventTitle">
            {duration} <br />
            <div className="CalendarTaskTitle">
            {title}</div>
          <br />
          <div className="CalendarTaskDescription">
            {description}
          </div>
          </div>
        </div>
      );

      previousTaskStartTime = {
        hour: endTime.hour,
        minute: endTime.minute,
      };
    }
    return html;
  }

  function getHoursBetween(
    endOfPreviousTask: { hour: string; minute: string },
    startOfNextTask: DateAndTime
  ): number {
    const prevHour = parseInt(endOfPreviousTask.hour);
    const prevMinute = parseInt(endOfPreviousTask.minute);
    const nextHour = parseInt(startOfNextTask.hour);
    const nextMinute = parseInt(startOfNextTask.minute);

    return nextHour - prevHour + (nextMinute - prevMinute) / 60;
  }

  function fillerDiv(height: number, key: number) {
    return (
      <div
        className="CalendarEventContainer-filler"
        style={{
          height: `${height}px`,
          minHeight: `${height}px`,
        }}
        key={`CalendarEventContainer-filler${key}`}
      >
        <div className="CalendarEventTitle"></div>
      </div>
    );
  }

  function getHoursToMidnight(startTime: DateAndTime): number {
    const { hour, minute } = startTime;
    let hoursToMidnight = 24 - 1 - parseInt(hour);
    const minutesToMidnight = 60 - parseInt(minute);
    hoursToMidnight += minutesToMidnight / 60;
    return hoursToMidnight;
  }

  function getHoursSinceMidnight(endTime: DateAndTime): number {
    const { hour, minute } = endTime;
    return parseInt(hour) + parseInt(minute) / 60;
  }

  function thisIsTheFirstDayOfTheTask(
    startTime: DateAndTime,
    currentDay: Date
  ): boolean {
    const startDayString: string = startTime.date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentDayString: string = currentDay.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return startDayString === currentDayString;
  }

  function thisIsTheLastDayOfTheTask(
    endTime: DateAndTime,
    currentDay: Date
  ): boolean {
    const endDayString: string = endTime.date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentDayString: string = currentDay.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return endDayString === currentDayString;
  }

  function taskHappensThisDay(task: CalendarTask, thisDay: Date): boolean {
    const currentWeekDay: string = thisDay.toLocaleString("en-US", {
      weekday: "short",
    });

    switch (currentWeekDay) {
      case "Mon":
        if (task.repeatMonday) return true;
        break;
      case "Tue":
        if (task.repeatTuesday) return true;
        break;
      case "Wed":
        if (task.repeatWednesday) return true;
        break;
      case "Thu":
        if (task.repeatThursday) return true;
        break;
      case "Fri":
        if (task.repeatFriday) return true;
        break;
      case "Sat":
        if (task.repeatSaturday) return true;
        break;
      case "Sun":
        if (task.repeatSunday) return true;
        break;
      default:
        break;
    }

    if (thisIsTheFirstDayOfTheTask(task.startTime, thisDay)) return true;
    if (thisIsTheLastDayOfTheTask(task.endTime, thisDay)) return true;

    const endTime = task.endTime.date.getTime();
    const startTime = task.startTime.date.getTime();
    const thisTime = thisDay.getTime();

    if (thisTime >= startTime && thisTime <= endTime) return true;

    return false;
  }

  function getSortedTasksForThisDate(date: Date) {
    let tasksThisDay: CalendarTask[] = [];
    calendarTasks.forEach((task) => {
      if (taskHappensThisDay(task, date)) {
        tasksThisDay.push(task);
      }
    });

    return tasksThisDay
      .slice()
      .sort((a, b) => a.startTime.date.getTime() - b.startTime.date.getTime());
  }

  function taskCrossesMidnight(task: CalendarTask): boolean {
    return task.startTime.day !== task.endTime.day;
  }

  return (
    <>
      <div className="CalendarDatePickerAndTaskControlsContainer">
        <div className="CalendarAndDatePickerContainer">
          <DateTimePicker
            onStateChange={handleDateTimePickerStateChange}
            uniqueKey="calendarDatePicker"
          />
          <div className="CalendarTaskControls">
            <button>Create new task</button>
            {selectedTask && (
              <button onClick={handleClickEditSelectedTaskButton}>
                Edit selected task
              </button>
            )}
            <div className="CalendarEventContainer CalendarEventTitle">
              {insertSelectedTask()}
            </div>
          </div>
        </div>
        <div className="CalendarContainer">
          <div className="DayLabelContainer">{dayLabel()}</div>
          <div className="HourLabelContainer">{hourLabel()}</div>
          {calendarDayColumn()}
        </div>
      </div>
    </>
  );
}
