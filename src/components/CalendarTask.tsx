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
                const borderColor = backgroundColor;
                return (
                    <div
                        className=" m-1 transform cursor-pointer transition-all duration-200 hover:opacity-80 hover:shadow-lg"
                        key={index}
                        onClick={() => {
                            taskEditor.setTask(task);
                            taskEditor.open();
                        }}
                    >
                        <div
                            style={{
                                height,
                                backgroundColor,
                                borderColor,
                                boxSizing: 'border-box',
                                overflow: 'hidden',
                                borderRadius: '0.375rem',
                            }}
                        >
                            <div className="flex justify-between px-3 pb-2 pt-3">
                                <p className="text-left font-semibold">{task.title}</p>
                                <p className=" text-nowrap text-right">
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
