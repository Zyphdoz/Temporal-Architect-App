import './styles/App.css';
import CalendarTaskEditor from './CalendarTaskEditor';
import { useState } from 'react';
import { CalendarTask } from './types/CalendarTask';
import Calendar from './Calendar';

function App() {
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);
    const [isInCalendar, setIsInCalendar] = useState<boolean>(true);
    const [isCreatingNewTask, setIsCreatingNewTask] = useState<boolean>(false);
    const [isEditingTask, setIsEditingTask] = useState<boolean>(false);

    function handleOnTaskSubmit(task: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return [...prevCalendarTasks, task];
        });
        showCalendarHideEverythingElse();
    }

    function handleCreateNewTaskButtonClick() {
        setIsInCalendar(false);
        setIsCreatingNewTask(true);
    }

    function handleCancelEdit() {
        showCalendarHideEverythingElse();
    }

    function showCalendarHideEverythingElse() {
        setIsCreatingNewTask(false);
        setIsEditingTask(false);
        setIsInCalendar(true);
    }

    return (
        <>
            {(isCreatingNewTask || isEditingTask) && (
                <CalendarTaskEditor onTaskSubmit={handleOnTaskSubmit} onCancelEdit={handleCancelEdit} />
            )}
            {isInCalendar && (
                <Calendar onCreateNewTaskButtonClick={handleCreateNewTaskButtonClick} calendarTasks={calendarTasks} />
            )}
        </>
    );
}

export default App;
