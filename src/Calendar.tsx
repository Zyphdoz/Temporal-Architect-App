import { useState } from "react";
import { CalendarEvent } from "./types/CalendarEvent";

function Calendar() {
  const [count, setCount] = useState(0);

  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const calendar : CalendarEvent[] = [
    {
    startTime: {
        year: 2024,
        month: 3,
        day: 17,
        hour: 21,
        minute: 15,
    },
    endTime: {
        year: 2024,
        month: 3,
        day: 17,
        hour: 21,
        minute: 45,
    },
    description: "description",
    category: ["test"],
    }
  ]

  const saturdayEvents = getAllCalendarEvents("Saturday");

  function getAllCalendarEvents(day: string) {
    let html : any[] = [];
    calendar.forEach(event => {
        html.push(<div>Day: {event.startTime.day}</div>)
    });
    return html;
  }



  function getCurrentDate() {
    const date = new Date();
    const day = date.getDate(); 
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    //new Date(Date.now()).toString()

    console.log(`${day}/${month}/${year}`);
  }
  return <>
  {saturdayEvents}
  
  </>;
}

export default Calendar;
