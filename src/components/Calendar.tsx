import CalendarDay from './CalendarDay';
import { addDays, getMonthName } from '../utils/dateAndTimeUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useRef, useState } from 'react';
import TaskEditor from './TaskEditor';
import CalendarDayHeader from './CalendarDayHeader';
import { calendar } from '../services/calendar';

function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);

    const handleChange = (newDate: Date) => {
        setDatePickerIsOpen(!datePickerIsOpen);

        fetchStartDate(newDate);
    };

    async function fetchStartDate(date: Date) {
        const startDate = await calendar.getCalendarStartDate(date);
        setSelectedDate(startDate);
    }

    useEffect(() => {
        fetchStartDate(new Date());
    }, []);

    const scrollbar = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollbar.current) {
            const rightNow = new Date();
            if (calendar.getTasksForDay(rightNow).length > 1) {
                scrollbar.current.scrollTop = (rightNow.getHours() - 3) * 120;
            }
        }
    }, [selectedDate]);

    if (selectedDate === null) {
        return <div></div>;
    }

    return (
        <div className="flex h-screen w-full flex-col overflow-x-hidden">
            <div className="relative border-b bg-gray-50 pb-3 pt-6 text-left text-4xl shadow-sm">
                <button
                    id="previousday"
                    className={`px-3 hover:font-bold`}
                    onClick={() =>
                        setSelectedDate((prevDate) => {
                            return addDays(prevDate!, -7);
                        })
                    }
                >
                    <span className="flex -translate-x-3 justify-center">{'〈'}</span>
                </button>
                <button
                    id="nextday"
                    className={`px-2 hover:font-bold`}
                    onClick={() =>
                        setSelectedDate((prevDate) => {
                            return addDays(prevDate!, 7);
                        })
                    }
                >
                    <span className="flex translate-x-3 justify-center">{'〉'}</span>
                </button>
                <label htmlFor="showdatepicker" className="mx-2 cursor-pointer pr-2">
                    {getMonthName(selectedDate)} {selectedDate.getFullYear()}
                </label>
                <div className="relative inline-block">
                    <button
                        id="showdatepicker"
                        className={`h-10 w-10 rounded-lg border bg-gray-100 hover:bg-gray-200 ${datePickerIsOpen && 'bg-gray-200'}`}
                        onClick={() => setDatePickerIsOpen(!datePickerIsOpen)}
                    >
                        <span className="flex -translate-y-1 justify-center">⌄</span>
                    </button>
                    {datePickerIsOpen && (
                        <div className="absolute right-0 z-50">
                            <DatePicker
                                key={selectedDate.getTime()}
                                selected={selectedDate}
                                onChange={handleChange}
                                onClickOutside={() => setDatePickerIsOpen(false)}
                                showYearDropdown
                                showMonthDropdown
                                inline
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex h-full overflow-hidden">
                <TaskEditor></TaskEditor>
                <div className="flex flex-grow flex-col">
                    <CalendarDayHeader startDay={selectedDate!}></CalendarDayHeader>
                    <div ref={scrollbar} className="flex overflow-x-hidden overflow-y-scroll">
                        <CalendarDay day={selectedDate!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 1)!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 2)!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 3)!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 4)!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 5)!}></CalendarDay>
                        <CalendarDay day={addDays(selectedDate, 6)!}></CalendarDay>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
