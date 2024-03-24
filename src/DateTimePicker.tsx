import { useEffect, useState } from 'react';
import { DateAndTime } from "./types/DateAndTime";
import "./styles/DateTimePicker.css";

export default function DateTimePicker({ defaultTime }: {defaultTime: DateAndTime}) {
  const [formData, setFormData] = useState<DateAndTime>(
    defaultTime
  );

  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (isDataIncomplete(formData)) {
      setFormDataToCurrentTime();
    } else if (parseInt(formData.minute) % 5 !== 0) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          minute: fitToMinutePicker(formData.minute),
        };
      });
    }
  }, []);

  useEffect(() => {
    if (selectedDayExistsInSelectedMonth()) {
      setShowError(false);
    }
  }, [formData.day]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedDayExistsInSelectedMonth()) {
      console.log(formData);
    } else {
      setShowError(true);
    }
  }

  function isDataIncomplete(data: DateAndTime) {
    const requiredFields: (keyof DateAndTime)[] = ['year', 'month', 'day', 'hour', 'minute'];
    return requiredFields.some(field => !data[field]);
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
    let html = [];
    const day: string[] = [
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
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];
    
    let dayPickerItemClassName: string = "DayPickerItem";

    for (let i = 1; i < 32; i++) {

      if (i > daysThisMonth()) {
        dayPickerItemClassName = "DayPickerItemGray";
      }

      html.push(
        <div key={day[i]}>
          <input
            className={dayPickerItemClassName}
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

  function daysThisMonth() {
    const month = formData.month;
    switch (month) {
      case "Jan":
      case "Mar":
      case "May":
      case "Jul":
      case "Aug":
      case "Oct":
      case "Dec":
        return 31;

      case "Apr":
      case "Jun":
      case "Sep":
      case "Nov":
        return 30;

      case "Feb":
        if (isLeapYear()) {
          return 29;
        } else {
          return 28;
        }

      default:
        return 0;
    }
  }

  function isLeapYear() {
    return parseInt(formData.year) % 4 > 0 ? false : true;
  }

  function prependZero(value: string) {
    return "0" + value;
  }

  function setFormDataToCurrentTime() {
    //force 3 letter english month names and 24 hour clock
    //produces a string in the format 'Mar 23, 2024, 16:39:40'
    const currentDate = new Date()
      .toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      })
      .split(" ");
    const month = currentDate[0];
    const day = currentDate[1].replace(',', '');
    const year = currentDate[2].replace(',', '');
    const hour = currentDate[3].split(":")[0];
    const minute = fitToMinutePicker(currentDate[3].split(":")[1]);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
      };
    });
  }



  function fitToMinutePicker(value: string): string {
    let number = parseInt(value);
    let numberIsDivisibleByFive: boolean = number % 5 === 0 ? true : false;

    if (numberIsDivisibleByFive) return number.toString();
    if (number > 55) return "55";

    for (let i = 0; i < 55; i++) {
      number++;
      numberIsDivisibleByFive = number % 5 === 0 ? true : false;
      if (number === 5) return prependZero(number.toString());
      if (numberIsDivisibleByFive) return number.toString();
    }

    return "00"; //this should never be reached, but it makes TypeScript happy
  }

  function selectedDayExistsInSelectedMonth() {
    const day = parseInt(formData.day);
    if (day <= daysThisMonth()) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
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
      {showError && (
        <div className="ErrorMessage">
          The selected month does not have {formData.day} days. Please select a
          different day or month.
        </div>
      )}
    </>
  );
}
