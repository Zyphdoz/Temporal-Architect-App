import { useState } from "react";
import { CalendarTask } from "./types/CalendarTask";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime } from "./types/DateAndTime";
import "./styles/Calendar.css"

export default function Calendar({
  calendarTasks,
}: {
  calendarTasks: CalendarTask[];
}) {
  const [dayLabels, setDayLabels] = useState<Date[]>(populateWithSevenNewDates());

  function handleDateTimePickerStateChange(event: DateAndTime) {
    setDayLabels(() => {
      let newDates = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date(event.date);
        date.setDate(date.getDate() + i);
        newDates.push(date);
      }
      return newDates;
    })
  }

  function populateWithSevenNewDates() {
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
        <div className="HourLabel" key={i}>
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
        <div className="DayLabel" key={i}>
          {dayLabels[i].toDateString()}
        </div>
      );
    }
    return html;
  }

  function calendarDayColumn() {
    let html = [];
    for (let i = 0; i < 7; i++) {
      html.push(
        <div className="CalendarDayColumn" key={i}>
          
        </div>
      );
    }
    return html;
  }

  return (
    <>
      <div className="CalendarAndDatePickerContainer">
        <DateTimePicker
          onStateChange={handleDateTimePickerStateChange}
          uniqueKey="calendarDatePicker"
        />
        <div className="CalendarContainer">
          <div className="DayLabelContainer">{dayLabel()}</div>
          <div className="HourLabelContainer">{hourLabel()}</div>
          {calendarDayColumn()}
        </div>
      </div>
    </>
  );
}
