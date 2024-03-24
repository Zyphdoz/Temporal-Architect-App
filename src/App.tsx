import { useState } from "react";

import "./styles/App.css";
import DateTimePicker from "./DateTimePicker";
import { DateAndTime } from "./types/DateAndTime";

function App() {
  const time: DateAndTime = {
    year: "2024",
    month: "Jan",
    day: "01",
    hour: "01",
    minute: "01",
  };

  return (
    <>
      <DateTimePicker defaultTime={time} />
    </>
  );
}

export default App;
