import { useState, cloneElement } from "react";
import { CalendarEvent } from "./types/CalendarEvent";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime } from "./types/DateAndTime";

export default function EditCalendarTask() {

  function handleStartTimeChange(startTime: DateAndTime) {

  }
  
  function handleEndTimeChange(endTime: DateAndTime) {
    
  }

  return (
    <>
      <DateTimePicker uniqueKey="startTime" onStateChange={handleStartTimeChange}/>
      <DateTimePicker uniqueKey="endTime" onStateChange={handleEndTimeChange}/>
    </>
  );
}

