import React from "react";
import { DateAndTime } from "./types/DateAndTime";
import "./styles/DateTimePicker.css";

export default function DateTimePicker() {
  const [formData, setFormData] = React.useState<DateAndTime>({
    year: "0",
    month: "0",
    day: "0",
    hour: "0",
    minute: "0",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
  }

  function yearPicker() {
    const year: string[] = ["2024"];
    let html = [];
    for (let i = 0; i < year.length; i++) {
      html.push(
        <div key={year[i]}>
          <input
            className="YearPickerItem"
            type="radio"
            id={`year-${year[i]}`} 
            name="year"
            value={year[i]}
            checked={formData.year === year[i]}
            onChange={handleChange}
          />
          <label htmlFor={`year-${year[i]}`}>{year[i]}</label>
        </div>
      );
    }
    return html;
  }

  function monthPicker() {
    const month: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let html = [];
    for (let i = 0; i < month.length; i++) {
      html.push(
        <div key={month[i]}>
          <input
            className="MonthPickerItem"
            type="radio"
            id={`month-${month[i]}`} 
            name="month"
            value={month[i]}
            checked={formData.month === month[i]}
            onChange={handleChange}
          />
          <label htmlFor={`month-${month[i]}`}>{month[i]}</label>
        </div>
      );
    }
    return html;
  }

  function dayPicker() {
    const day: string[] = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    let html = [];
    for (let i = 0; i < day.length; i++) {
      html.push(
        <div key={day[i]}>
          <input
            className="DayPickerItem"
            type="radio"
            id={`day-${day[i]}`}
            name="day"
            value={day[i]}
            checked={formData.day === day[i]}
            onChange={handleChange}
          />
          <label htmlFor={`day-${day[i]}`}>{day[i]}</label>
        </div>
      );
    }
    return html;
  }

  function hourPicker() {
    const hour: string[] = [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    let html = [];
    for (let i = 0; i < hour.length; i++) {
      html.push(
        <div key={hour[i]}>
          <input
            className="HourPickerItem"
            type="radio"
            id={`hour-${hour[i]}`}
            name="hour"
            value={hour[i]}
            checked={formData.hour === hour[i]}
            onChange={handleChange}
          />
          <label htmlFor={`hour-${hour[i]}`}>{hour[i]}</label>
        </div>
      );
    }
    return html;
  }

  function minutePicker() {
    const minute: string[] = [
      "00",
      "05",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
    ];
    let html = [];
    for (let i = 0; i < minute.length; i++) {
      html.push(
        <div key={minute[i]}>
          <input
            className="MinutePickerItem"
            type="radio"
            id={`minute-${minute[i]}`}
            name="minute"
            value={minute[i]}
            checked={formData.minute === minute[i]}
            onChange={handleChange}
          />
          <label htmlFor={`minute-${minute[i]}`}>{minute[i]}</label>
        </div>
      );
    }
    return html;
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="YearPicker">
        <legend>Year</legend>
        {yearPicker()}
      </fieldset>
      <fieldset className="MonthPicker">
        <legend>Month</legend>
        {monthPicker()}
      </fieldset>
      <fieldset className="DayPicker">
        <legend>Day</legend>
        {dayPicker()}
      </fieldset>
      <fieldset className="HourPicker">
        <legend>Hour</legend>
        {hourPicker()}
      </fieldset>
      <fieldset className="MinutePicker">
        <legend>Minute</legend>
        {minutePicker()}
      </fieldset>

      <button>Submit</button>
    </form>
  );
}
