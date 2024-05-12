import { CalendarTask as CalendarTaskType } from '../services/calendar';
import { taskEditor } from '../services/taskEditor';
import { dateToHhMmIn24hFormat } from '../utils/dateAndTimeUtils';

interface CalendarTaskProps {
    tasks: CalendarTaskType[];
}

function CalendarTask({ tasks }: CalendarTaskProps) {
    return (
        <>
            {tasks.map((task, index) => {
                const height = task.duration;
                const backgroundColor = task.backgroundColor;
                return (
                    <div
                        className="transform cursor-pointer transition-all duration-200 hover:opacity-80 hover:shadow-lg"
                        key={index}
                        onClick={() => {
                            taskEditor.setTask(task);
                            taskEditor.open();
                        }}
                    >
                        <div style={{ height, backgroundColor, boxSizing: 'border-box' }}>
                            <div className="flex justify-between px-4 pb-2 pt-3">
                                <p>{task.title}</p>
                                <p>
                                    {dateToHhMmIn24hFormat(task.startTime)}-{dateToHhMmIn24hFormat(task.endTime)}
                                </p>
                            </div>
                            <div className="px-3">{task.description}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default CalendarTask;
