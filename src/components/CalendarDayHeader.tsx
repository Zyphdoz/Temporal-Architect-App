import { addDays, getShortWeekday } from '../utils/dateAndTimeUtils';

interface CalendarDayHeaderProps {
    startDay: Date;
}

function CalendarDayHeader({ startDay }: CalendarDayHeaderProps) {
    const days: Date[] = [
        startDay,
        addDays(startDay, 1),
        addDays(startDay, 2),
        addDays(startDay, 3),
        addDays(startDay, 4),
        addDays(startDay, 5),
        addDays(startDay, 6),
    ];
    return (
        <div className="flex border-b">
            {days.map((day) => {
                return (
                    <div className="mx-auto">
                        <div id="headerDay" className="mt-1 text-center">
                            {`${getShortWeekday(day)}`}
                        </div>
                        <div id="headerDate" className="m-auto my-1 h-10 w-10 rounded-full border text-center text-3xl">
                            {`${day.getDate()}`}
                        </div>
                    </div>
                );
            })}
            {/* empty div with same width as scroll bar in order to keep the header dates aligned with the tasks */}
            <div style={{ width: '15px' }}></div>
        </div>
    );
}

export default CalendarDayHeader;
