import { useEffect, useState } from "react";
import { DateAndTime, Day, Hour, Minute, Month } from "./types/DateAndTime";
import "./styles/DateTimePicker.css";

export default function DateTimePicker({
  onStateChange,
  defaultTime,
  uniqueKey,
}: {
  onStateChange: (formData: DateAndTime) => void;
  defaultTime?: DateAndTime;
  uniqueKey: string;
}) {
  const [formData, setFormData] = useState<DateAndTime>(defaultTime ? defaultTime : getCurrentTime());
  const [yearPickerStrings, setYearPickerStrings] = useState<string[]>(
    getPreviousCurrentAndNextYear(defaultTime?.year as string)
  );
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    // if the passed in minute prop is not divisible by 5
    // replace it with one that is divisible by 5
    if (parseInt(formData.minute) % 5 !== 0) {
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
      onStateChange(formData);
    } else {
      setShowError(true);
    }
  }, [formData]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function yearPicker() {
    const year: string[] = yearPickerStrings;
    let html = [];
    html.push(
      <button
        key={uniqueKey + "decrementYearButton"}
        type="button"
        className="YearPickerItem"
        onClick={() => decrementYearPickerStrings(3)}
      >
        ❮
      </button>
    );
    for (let i = 0; i < year.length; i++) {
      html.push(
        <div key={uniqueKey + year[i]}>
          <input
            className="YearPickerItem"
            type="radio"
            id={`year-${uniqueKey}${year[i]}`}
            name="year"
            value={year[i]}
            checked={formData.year === year[i]}
            onChange={handleChange}
          />
          <label htmlFor={`year-${uniqueKey}${year[i]}`}>{year[i]}</label>
        </div>
      );
    }
    html.push(
      <button
        key={uniqueKey + "incrementYearButton"}
        type="button"
        className="YearPickerItem"
        onClick={() => incrementYearPickerStrings(3)}
      >
        ❯
      </button>
    );
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
        <div key={uniqueKey + month[i]}>
          <input
            className="MonthPickerItem"
            type="radio"
            id={`month-${uniqueKey}${month[i]}`}
            name="month"
            value={month[i]}
            checked={formData.month === month[i]}
            onChange={handleChange}
          />
          <label htmlFor={`month-${uniqueKey}${month[i]}`}>{month[i]}</label>
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
        <div key={uniqueKey + day[i]}>
          <input
            className={dayPickerItemClassName}
            type="radio"
            id={`day-${uniqueKey}${day[i]}`}
            name="day"
            value={day[i]}
            checked={formData.day === day[i]}
            onChange={handleChange}
          />
          <label htmlFor={`day-${uniqueKey}${day[i]}`}>{day[i]}</label>
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
        <div key={uniqueKey + hour[i]}>
          <input
            className="HourPickerItem"
            type="radio"
            id={`hour-${uniqueKey}${hour[i]}`}
            name="hour"
            value={hour[i]}
            checked={formData.hour === hour[i]}
            onChange={handleChange}
          />
          <label htmlFor={`hour-${uniqueKey}${hour[i]}`}>{hour[i]}</label>
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
        <div key={uniqueKey + minute[i]}>
          <input
            className="MinutePickerItem"
            type="radio"
            id={`minute-${uniqueKey}${minute[i]}`}
            name="minute"
            value={minute[i]}
            checked={formData.minute === minute[i]}
            onChange={handleChange}
          />
          <label htmlFor={`minute-${uniqueKey}${minute[i]}`}>{minute[i]}</label>
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

  function getCurrentTime(): DateAndTime {
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
    const month = currentDate[0] as Month;
    const day = currentDate[1].replace(",", "") as Day;
    const year = currentDate[2].replace(",", "");
    const hour = currentDate[3].split(":")[0] as Hour;
    const minute = fitToMinutePicker(currentDate[3].split(":")[1]);

    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
    };
  }

  function fitToMinutePicker(value: string): Minute {
    let number = parseInt(value);
    let numberIsDivisibleByFive: boolean = number % 5 === 0 ? true : false;

    if (numberIsDivisibleByFive) return number.toString() as Minute;
    if (number > 55) return "55";

    for (let i = 0; i < 55; i++) {
      number++;
      numberIsDivisibleByFive = number % 5 === 0 ? true : false;
      if (number === 5) return prependZero(number.toString()) as Minute;
      if (numberIsDivisibleByFive) return number.toString() as Minute;
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

  function getPreviousCurrentAndNextYear(year: string): string[] {
    const currentYear: string = year !== undefined ? year : new Date().toLocaleString("en-US", {
      year: "numeric",
    });
    const previousYear: string = (parseInt(currentYear) - 1).toString();
    const nextYear: string = (parseInt(currentYear) + 1).toString();

    return [previousYear, currentYear, nextYear];
  }

  function incrementYearPickerStrings(incrementBy: number) {
    setYearPickerStrings((prevYearPickerStrings) => {
      return prevYearPickerStrings.map((year) => {
        return (parseInt(year) + incrementBy).toString();
      });
    });
  }

  function decrementYearPickerStrings(decrementBy: number) {
    setYearPickerStrings((prevYearPickerStrings) => {
      return prevYearPickerStrings.map((year) => {
        return (parseInt(year) - decrementBy).toString();
      });
    });
  }

  return (
    <>
      <form>
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
      </form>
      {showError && (
        <div className="ErrorMessage">
          The selected month does not have {formData.day} days. <br></br>
          Please select a different day or month.
        </div>
      )}
    </>
  );
}
