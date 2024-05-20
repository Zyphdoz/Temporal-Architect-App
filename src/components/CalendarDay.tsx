import { calendar } from '../services/calendar'; //.state
import CalendarTask from './CalendarTask';

interface CalendarDayProps {
    day: Date;
}

function CalendarDay({ day }: CalendarDayProps) {
    const tasks = calendar.getTasksForDay(day)!;
    return (
        <div className="min-w-0 flex-shrink-0 flex-grow basis-0">
            <CalendarTask tasks={tasks}></CalendarTask>
        </div>
    );
}

export default CalendarDay;
