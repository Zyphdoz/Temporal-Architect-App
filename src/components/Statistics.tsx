import { useState } from 'react';
import { statistics } from '../services/statistics';
import { addDays } from '../utils/dateAndTimeUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Statistics() {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(addDays(startTime, 6));

    const categoriesWithStats = statistics.getCategoriesWithStats(startTime, endTime);
    return (
        <div className="flex w-full flex-col bg-gray-50">
            <div className="relative border-b bg-gray-50 pb-3 pt-6 text-left text-4xl shadow-sm">
                <p className="ml-4">Statistics</p>
            </div>
            <div className="flex flex-grow flex-row">
                <div className="flex min-w-80 max-w-80 flex-grow flex-col border-r bg-gray-100 p-4 shadow-sm">
                    <label htmlFor="starttime" className="mb-2 mt-5">
                        From
                    </label>
                    <DatePicker
                        id="starttime"
                        className="h-10 w-full rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
                        selected={startTime}
                        onChange={(date) => setStartTime(date!)}
                        dateFormat="EEE, MMMM d, yyyy"
                        showYearDropdown
                        showMonthDropdown
                    />
                    <label htmlFor="endtime" className="mb-2 mt-5">
                        To
                    </label>
                    <DatePicker
                        id="endtime"
                        className="h-10 w-full rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
                        selected={endTime}
                        onChange={(date) => setEndTime(date!)}
                        dateFormat="EEE, MMMM d, yyyy"
                        showYearDropdown
                        showMonthDropdown
                    />
                </div>
                <div className="flex flex-grow flex-col p-4">
                    <table className=" min-w-fit max-w-80 divide-y divide-gray-200 rounded-md border-2">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Category</th>
                                <th className="px-6 py-3 text-left">Hours in selection</th>
                                <th className="px-6 py-3 text-left">Weekly Hours</th>
                                <th className="px-6 py-3 text-left">Annual Hours</th>
                                <th className="px-6 py-3 text-left">Hours Per Decade</th>
                                <th className="px-6 py-3 text-left">Days Per Decade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-gray-50">
                            {Object.entries(categoriesWithStats!).map(([category, details], index) => (
                                <tr key={category} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                                    <td className="whitespace-nowrap px-6 py-4">{category}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{details.totalHours}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{details.weeklyHours}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{details.annualHours}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{details.hoursPerDecade}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{details.daysPerDecade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
