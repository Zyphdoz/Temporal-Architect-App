import { calendar } from '../services/calendar'; //.state
import CalendarTask from './CalendarTask';

interface CalendarDayProps {
    day: Date;
}

function CalendarDay({ day }: CalendarDayProps) {
    const tasks = calendar.getTasksForDay(day)!;
    return (
        <>
            <CalendarTask tasks={tasks}></CalendarTask>
        </>
    );
}

export default CalendarDay;
