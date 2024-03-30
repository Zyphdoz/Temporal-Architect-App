import './styles/App.css';
import CalendarTaskEditor from './CalendarTaskEditor';
import { useState } from 'react';
import { CalendarTask } from './types/CalendarTask';
import Calendar from './Calendar';
import { Day, Hour, Minute, Month } from './types/DateAndTime';

function App() {
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);
    const [isInCalendar, setIsInCalendar] = useState<boolean>(true);
    const [isCreatingNewTask, setIsCreatingNewTask] = useState<boolean>(false);
    const [taskBeingEdited, setTaskBeingEdited] = useState<CalendarTask | undefined>();

    function handleOnTaskSubmit(task: CalendarTask) {
        createTask(task);
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

    function handleDeleteTask(deletedTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return prevCalendarTasks.filter((oldTask) => oldTask.taskId !== deletedTask.taskId);
        });
        showCalendarHideEverythingElse();
    }

    function handleTaskUpdate(updatedTask: CalendarTask) {
        handleDeleteTask(updatedTask);
        createTask(updatedTask);
        showCalendarHideEverythingElse();
    }

    function createTask(task: CalendarTask) {
        const repeats = task.numRepeats;
        if (repeats === 0) {
            setCalendarTasks((prevCalendarTasks) => {
                return [...prevCalendarTasks, task];
            });
            return;
        } else {
            const newCalendarTasks: CalendarTask[] = getAllRepeatingTasks(task);
            setCalendarTasks((prevCalendarTasks) => {
                return [...prevCalendarTasks, ...newCalendarTasks];
            });
        }
    }

    function getAllRepeatingTasks(task: CalendarTask): CalendarTask[] {
        let startDate = task.startTime.date;
        let newCalendarTasks: CalendarTask[] = [];

        while (newCalendarTasks.length < task.numRepeats) {
            if (task.repeatMonday && getDayOfTheWeek(startDate) === 'Mon') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatTuesday && getDayOfTheWeek(startDate) === 'Tue') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatWednesday && getDayOfTheWeek(startDate) === 'Wed') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatThursday && getDayOfTheWeek(startDate) === 'Thu') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatFriday && getDayOfTheWeek(startDate) === 'Fri') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatSaturday && getDayOfTheWeek(startDate) === 'Sat') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            } else if (task.repeatSunday && getDayOfTheWeek(startDate) === 'Sun') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, task));
            }
            startDate = getNextDate(startDate);
        }

        return newCalendarTasks;
    }

    function getNewTaskFromDate(startDate: Date, task: CalendarTask): CalendarTask {
        const endDate = new Date(startDate.getTime() + task.taskDuration);
        return {
            ...task,
            startTime: {
                hour: startDate.getHours().toString().padStart(2, '0') as Hour,
                minute: startDate.getMinutes().toString().padStart(2, '0') as Minute,
                day: startDate.getDate().toString().padStart(2, '0') as Day,
                year: startDate.getFullYear().toString(),
                month: startDate.toLocaleString('default', { month: 'short' }) as Month,
                date: startDate,
            },
            endTime: {
                hour: endDate.getHours().toString().padStart(2, '0') as Hour,
                minute: endDate.getMinutes().toString().padStart(2, '0') as Minute,
                day: endDate.getDate().toString().padStart(2, '0') as Day,
                year: endDate.getFullYear().toString(),
                month: endDate.toLocaleString('default', { month: 'short' }) as Month,
                date: endDate,
            },
        };
    }

    function getDayOfTheWeek(date: Date): string {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    function getNextDate(date: Date): Date {
        let nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        return nextDate;
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
