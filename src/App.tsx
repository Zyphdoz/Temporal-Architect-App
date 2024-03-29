import './styles/App.css';
import CalendarTaskEditor from './CalendarTaskEditor';
import { useState } from 'react';
import { CalendarTask } from './types/CalendarTask';
import Calendar from './Calendar';

function App() {
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);
    const [isInCalendar, setIsInCalendar] = useState<boolean>(true);
    const [isCreatingNewTask, setIsCreatingNewTask] = useState<boolean>(false);
    const [taskBeingEdited, setTaskBeingEdited] = useState<CalendarTask | undefined>();

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
        setTaskBeingEdited(undefined);
        setIsInCalendar(true);
    }

    function handleEditTaskClick(task: CalendarTask) {
        setIsInCalendar(false);
        setTaskBeingEdited(task);
    }

    function handleDeleteTask(newTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return prevCalendarTasks.filter((oldTask) => oldTask.taskId !== newTask.taskId);
        });
        showCalendarHideEverythingElse();
    }

    function handleTaskUpdate(newTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return prevCalendarTasks.map((oldTask) => (oldTask.taskId === newTask.taskId ? newTask : oldTask));
        });
        showCalendarHideEverythingElse();
    }

    return (
        <>
            {(isCreatingNewTask || taskBeingEdited) && (
                <CalendarTaskEditor
                    onTaskSubmit={handleOnTaskSubmit}
                    onTaskUpdate={handleTaskUpdate}
                    onCancelEdit={handleCancelEdit}
                    onDeleteTask={handleDeleteTask}
                    taskBeingEdited={taskBeingEdited}
                />
            )}
            {isInCalendar && (
                <Calendar
                    onHandleEditTaskClick={handleEditTaskClick}
                    onCreateNewTaskButtonClick={handleCreateNewTaskButtonClick}
                    calendarTasks={calendarTasks}
                />
            )}
        </>
    );
}

export default App;
