import { useState } from "react";

import "./styles/App.css";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime } from "./types/DateAndTime";
import CalendarTaskEditor from "./CalendarTaskEditor";

function App() {


  function handleStateChange(state: DateAndTime) {
    console.log(state);
  }

  return (
    <>
      <CalendarTaskEditor/>
    </>
  );
}

export default App;
