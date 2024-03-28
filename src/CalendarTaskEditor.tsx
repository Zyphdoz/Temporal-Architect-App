import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime } from "./types/DateAndTime";
import { CalendarTask } from "./types/CalendarTask";
import "./styles/CalendarTaskEditor.css";

export default function EditCalendarTask({
  onTaskSubmit,
}: {
  onTaskSubmit: (calendarTaskFormData: CalendarTask) => void;
}) {
  const [calendarTaskFormData, setCalendarTaskFormData] =
    useState<CalendarTask>({
      title: "",
      description: "",
      category: "",
      startTime: {
        year: "1970",
        month: "Jan",
        day: "01",
        hour: "00",
        minute: "00",
        date: new Date(),
      },
      endTime: {
        year: "1970",
        month: "Jan",
        day: "01",
        hour: "00",
        minute: "00",
        date: new Date(),
      },
      taskDuration: 0,
      taskId: 0,
      repeatMonday: false,
      repeatTuesday: false,
      repeatWednesday: false,
      repeatThursday: false,
      repeatFriday: false,
      repeatSaturday: false,
      repeatSunday: false,
    });

  const [
    showNegativeTaskDurationErrorMessage,
    setShowNegativeTaskDurationErrorMessage,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (!endTimeComesBeforeStartTime()) {
      setShowNegativeTaskDurationErrorMessage(false);
      setCalendarTaskFormData((prevCalendarTaskFormData) => {
        return {
          ...prevCalendarTaskFormData,
          taskDuration:
            prevCalendarTaskFormData.endTime.date.getTime() -
            prevCalendarTaskFormData.startTime.date.getTime(),
          taskId: new Date().getTime(),
        };
      });
    }
  }, [calendarTaskFormData.startTime.date, calendarTaskFormData.endTime.date]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setCalendarTaskFormData((prevCalendarTaskFormData) => {
      return {
        ...prevCalendarTaskFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (endTimeComesBeforeStartTime()) {
      setShowNegativeTaskDurationErrorMessage(true);
    } else {
      onTaskSubmit(calendarTaskFormData);
    }
  }

  function handleStartTimeChange(startTime: DateAndTime) {
    setCalendarTaskFormData((prevcalendarTaskFormData) => {
      return {
        ...prevcalendarTaskFormData,
        startTime: startTime,
      };
    });
  }

  function handleEndTimeChange(endTime: DateAndTime) {
    setCalendarTaskFormData((prevcalendarTaskFormData) => {
      return {
        ...prevcalendarTaskFormData,
        endTime: endTime,
      };
    });
  }

  function endTimeComesBeforeStartTime(): boolean {
    return calendarTaskFormData.endTime.date.getTime() <
      calendarTaskFormData.startTime.date.getTime()
      ? true
      : false;
  }

  return (
    <>
      <div className="CalendarTaskEditor">
        <fieldset>
          <legend>Start Time</legend>
          <DateTimePicker
            uniqueKey="startTime"
            onStateChange={handleStartTimeChange}
          />
        </fieldset>
        <fieldset>
          <legend>End Time</legend>
          <DateTimePicker
            uniqueKey="endTime"
            onStateChange={handleEndTimeChange}
          />
        </fieldset>
        <form className="TaskDetails" onSubmit={handleSubmit}>
          <input
            id="TaskTitle"
            placeholder="TITLE"
            name="title"
            value={calendarTaskFormData.title}
            onChange={handleChange}
          ></input>

          <textarea
            id="TaskDescription"
            placeholder="DESCRIPTION (optional)"
            name="description"
            value={calendarTaskFormData.description}
            onChange={handleChange}
          ></textarea>

          <textarea
            id="TaskTags"
            placeholder="CATEGORY (separate multiple categories with comma)"
            name="category"
            value={calendarTaskFormData.category}
            onChange={handleChange}
          ></textarea>

          <fieldset className="RecurringTaskCheckbox">
            <legend>Repeat every</legend>
            <input
              type="checkbox"
              id="monday"
              name="repeatMonday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatMonday}
            ></input>
            <label htmlFor="monday">Mon</label>
            <input
              type="checkbox"
              id="tuesday"
              name="repeatTuesday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatTuesday}
            ></input>
            <label htmlFor="tuesday">Tue</label>
            <input
              type="checkbox"
              id="wednesday"
              name="repeatWednesday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatWednesday}
            ></input>
            <label htmlFor="wednesday">Wed</label>
            <input
              type="checkbox"
              id="thursday"
              name="repeatThursday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatThursday}
            ></input>
            <label htmlFor="thursday">Thu</label>
            <input
              type="checkbox"
              id="friday"
              name="repeatFriday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatFriday}
            ></input>
            <label htmlFor="friday">Fri</label>
            <input
              type="checkbox"
              id="saturday"
              name="repeatSaturday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatSaturday}
            ></input>
            <label htmlFor="saturday">Sat</label>
            <input
              type="checkbox"
              id="sunday"
              name="repeatSunday"
              onChange={handleChange}
              checked={calendarTaskFormData.repeatSunday}
            ></input>
            <label htmlFor="sunday">Sun</label>
          </fieldset>

          <button>Add task</button>
          <button type="button">Cancel</button>
        </form>
      </div>
      {showNegativeTaskDurationErrorMessage && (
        <div className="ErrorMessage">
          An event cannot end before it starts. <br />
          Please double check your start and end times and make sure the start
          time comes before the end time.
        </div>
      )}
    </>
  );
}
