import './styles/App.css';
import CalendarTaskEditor from './CalendarTaskEditor';
import { useState } from 'react';
import { CalendarTask } from './types/CalendarTask';
import Calendar from './Calendar';

function App() {
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);

    function handleOnTaskSubmit(task: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return [...prevCalendarTasks, task];
        });
    }

    return (
        <>
            <div className="">
                <CalendarTaskEditor onTaskSubmit={handleOnTaskSubmit} />
            </div>
            <Calendar calendarTasks={calendarTasks} />
        </>
    );
}

export default App;
