import { calendar } from '../services/calendar';
import { getShortWeekday } from '../utils/dateAndTimeUtils';
import CalendarTask from './CalendarTask';

interface CalendarDayProps {
    day: Date;
}

function CalendarDay({ day }: CalendarDayProps) {
    const tasks = calendar.getTasksForDay(day)!;
    const englishWeekdayShort = getShortWeekday(day);
    const date = day.getDate();
    return (
        <>
            <div className="flex flex-col border-l">
                <div className="border-b">
                    <div id="headerDay" className="mt-1 text-center">
                        {`${englishWeekdayShort}`}
                    </div>
                    <div id="headerDate" className="m-auto my-1 h-10 w-10 rounded-full border text-center text-3xl">
                        {`${date}`}
                    </div>
                </div>
                <CalendarTask tasks={tasks}></CalendarTask>
            </div>
        </>
    );
}

export default CalendarDay;
