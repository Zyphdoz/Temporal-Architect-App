import { CalendarTask } from '../services/calendar';
import { dateToHhMmIn24hFormat, dateToMmDdYyyyString } from '../utils/dateAndTimeUtils';

interface CalendarEventProps {
    task: CalendarTask;
}

function CalendarEvent({ task }: CalendarEventProps) {
    const height = task.taskDuration;
    const backgroundColor = task.backgroundColor;
    return (
        <>
            <div style={{ height, backgroundColor }} className="h-32 w-52 rounded-md">
                <div className="flex justify-between px-4 pb-2 pt-3">
                    <p>{task.title}</p>
                    <p>{dateToHhMmIn24hFormat(task.startTime)}</p>
                </div>
                <hr className="border-blue-500"></hr>
                <div className="px-3">{task.description}</div>
            </div>
        </>
    );
}

export default CalendarEvent;
