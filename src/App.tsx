import "./styles/App.css";
import CalendarTaskEditor from "./CalendarTaskEditor";
import { useState } from "react";
import { CalendarTask } from "./types/CalendarTask";

function App() {
  const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);

  function handleOnTaskSubmit(task: CalendarTask) {
    setCalendarTasks((prevCalendarTasks) => {
      return [...prevCalendarTasks, task];
    });
  }

  return (
    <>
      <CalendarTaskEditor onTaskSubmit={handleOnTaskSubmit} />
      {JSON.stringify(calendarTasks)}
    </>
  );
}

export default App;
