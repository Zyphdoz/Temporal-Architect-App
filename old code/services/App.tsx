/*
import './styles/App.css';
import CalendarTaskEditor from './CalendarTaskEditor';
import { useState } from 'react';
import { CalendarTask, EditMode } from './types/CalendarTask';
import Calendar from './Calendar';
import { Day, Hour, Minute, Month } from './types/DateAndTime';

function App() {
    const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>([]);
    const [isInCalendar, setIsInCalendar] = useState<boolean>(true);
    const [isCreatingNewTask, setIsCreatingNewTask] = useState<boolean>(false);
    const [taskBeingEdited, setTaskBeingEdited] = useState<CalendarTask | undefined>();
    const [typeOfEdit, setTypeOfEdit] = useState<EditMode>();

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

    function handleEditTaskClick(task: CalendarTask, typeOfEdit: EditMode) {
        setIsInCalendar(false);
        setTypeOfEdit(typeOfEdit);
        setTaskBeingEdited(task);
    }

    function handleDeleteTask(deletedTask: CalendarTask) {
        if (typeOfEdit === 'normal task') {
            deleteSingleInstanceOfNonRepeatingTask(deletedTask);
        } else if (typeOfEdit === 'single instance of repeating task') {
            deleteSingleCopyOfRepeatingTask(deletedTask);
        } else if (typeOfEdit === 'all future instances of repeating task') {
            deleteAllFutureInstancesOfRepeatingTask(deletedTask);
        }
        showCalendarHideEverythingElse();
    }

    function handleTaskUpdate(updatedTask: CalendarTask) {
        if (typeOfEdit === 'normal task') {
            updateSingleInstanceOfNonRepeatingTask(updatedTask);
        } else if (typeOfEdit === 'single instance of repeating task') {
            updateSingleCopyOfRepeatingTask(updatedTask);
        } else if (typeOfEdit === 'all future instances of repeating task') {
            updateAllFutureInstancesOfRepeatingTask(updatedTask);
        }
        showCalendarHideEverythingElse();
    }

    function updateSingleInstanceOfNonRepeatingTask(updatedTask: CalendarTask) {
        handleDeleteTask(updatedTask);
        createTask(updatedTask);
    }

    function updateSingleCopyOfRepeatingTask(updatedTask: CalendarTask) {
        deleteSingleCopyOfRepeatingTask(updatedTask);
        const newTask: CalendarTask = {
            ...updatedTask,
            taskId: new Date().getTime(),
            numRepeats: 0,
            repeatMonday: false,
            repeatTuesday: false,
            repeatWednesday: false,
            repeatThursday: false,
            repeatFriday: false,
            repeatSaturday: false,
            repeatSunday: false,
        };
        createTask(newTask);
    }
    function updateAllFutureInstancesOfRepeatingTask(updatedTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            const allInstancesOfRepeatingTask: CalendarTask[] = prevCalendarTasks.filter(
                (oldTask) => oldTask.taskId === updatedTask.taskId
            );

            let futureInstancesOfRepeatingTask: CalendarTask[] = allInstancesOfRepeatingTask.filter(
                (repeatingTask) => repeatingTask.startTime.date.getTime() >= updatedTask.startTime.date.getTime()
            );

            // Return only tasks that are not future instances of repeating tasks
            const prevCalendarTasksFiltered = prevCalendarTasks.filter(
                (oldTask) =>
                    !futureInstancesOfRepeatingTask.some((task) => task.startTime.date === oldTask.startTime.date)
            );

            const numberOfTasksDeleted = prevCalendarTasks.length - prevCalendarTasksFiltered.length;

            const newUpdatedTask: CalendarTask = {
                ...updatedTask,
                numRepeats: numberOfTasksDeleted,
                taskId: new Date().getTime(),
            };

            return [...prevCalendarTasksFiltered, ...getAllRepeatingTasks(newUpdatedTask)];
        });
    }

    function deleteSingleInstanceOfNonRepeatingTask(deletedTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            return prevCalendarTasks.filter((oldTask) => oldTask.taskId !== deletedTask.taskId);
        });
    }

    function deleteSingleCopyOfRepeatingTask(deletedTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            const allInstancesOfRepeatingTask: CalendarTask[] = prevCalendarTasks.filter(
                (oldTask) => oldTask.taskId === deletedTask.taskId
            );

            const thisInstanceOfRepeatingTask: CalendarTask = allInstancesOfRepeatingTask.filter(
                (repeatingTask) => repeatingTask.startTime.date.getTime() === deletedTask.startTime.date.getTime()
            )[0];

            return prevCalendarTasks.filter((oldTask) => oldTask !== thisInstanceOfRepeatingTask);
        });
    }

    function deleteAllFutureInstancesOfRepeatingTask(deletedTask: CalendarTask) {
        setCalendarTasks((prevCalendarTasks) => {
            const allInstancesOfRepeatingTask: CalendarTask[] = prevCalendarTasks.filter(
                (oldTask) => oldTask.taskId === deletedTask.taskId
            );

            const futureInstancesOfRepeatingTask: CalendarTask[] = allInstancesOfRepeatingTask.filter(
                (repeatingTask) => repeatingTask.startTime.date.getTime() >= deletedTask.startTime.date.getTime()
            );

            return prevCalendarTasks.filter(
                // Return only tasks that are not future instances of repeating tasks
                (oldTask) =>
                    !futureInstancesOfRepeatingTask.some((task) => task.startTime.date === oldTask.startTime.date)
            );
        });
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
        let endDate = task.endTime.date;
        let newCalendarTasks: CalendarTask[] = [];

        while (newCalendarTasks.length < task.numRepeats) {
            if (task.repeatMonday && getDayOfTheWeek(startDate) === 'Mon') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatTuesday && getDayOfTheWeek(startDate) === 'Tue') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatWednesday && getDayOfTheWeek(startDate) === 'Wed') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatThursday && getDayOfTheWeek(startDate) === 'Thu') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatFriday && getDayOfTheWeek(startDate) === 'Fri') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatSaturday && getDayOfTheWeek(startDate) === 'Sat') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            } else if (task.repeatSunday && getDayOfTheWeek(startDate) === 'Sun') {
                newCalendarTasks.push(getNewTaskFromDate(startDate, endDate, task));
            }
            startDate = getNextDate(startDate);
            endDate = getNextDate(endDate);
        }

        return newCalendarTasks;
    }

    function getNewTaskFromDate(startDate: Date, endDate: Date, task: CalendarTask): CalendarTask {
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
*/
