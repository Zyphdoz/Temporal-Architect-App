import { CalendarTask as CalendarTaskType } from '../services/calendar';
import { dateToHhMmIn24hFormat } from '../utils/dateAndTimeUtils';

interface CalendarTaskProps {
    tasks: CalendarTaskType[];
}

function CalendarTask({ tasks }: CalendarTaskProps) {
    return (
        <>
            {tasks.map((task, index) => {
                const height = task.taskDuration;
                const backgroundColor = task.backgroundColor;
                return (
                    <div className="m-1" key={index}>
                        <div style={{ height, backgroundColor, boxSizing: 'border-box' }}>
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

export default CalendarTask;
