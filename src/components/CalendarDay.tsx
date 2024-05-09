import { calendar } from '../services/calendar';
import { dateToHhMmIn24hFormat, getShortWeekday } from '../utils/dateAndTimeUtils';

interface CalendarDayProps {
    day: Date;
}

function CalendarDay({ day }: CalendarDayProps) {
    const tasks = calendar.getTasksForDay(day)!;
    return (
        <>
            {tasks.map((task, index) => {
                const height = task.taskDuration;
                const backgroundColor = task.backgroundColor;
                const englishWeekdayShort = getShortWeekday(day);
                const date = day.getDate();
                return (
                    <div className="flex flex-col" key={index}>
                        <div id="headerDay" className="mt-1 text-center">
                            {`${englishWeekdayShort}`}
                        </div>
                        <div id="headerDate" className="m-auto my-1 h-10 w-10 rounded-full border text-center text-3xl">
                            {`${date}`}
                        </div>
                        <div style={{ height, backgroundColor }} className="m-1 h-32">
                            <div className="flex justify-between px-4 pb-2 pt-3">
                                <p>{task.title}</p>
                                <p>{dateToHhMmIn24hFormat(task.startTime)}</p>
                            </div>
                            <hr className="border-blue-500"></hr>
                            <div className="px-3">{task.description}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default CalendarDay;
