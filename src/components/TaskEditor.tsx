import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TaskEditor() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div id="taskeditorcontainer" className="flex min-w-80 flex-col border-r bg-gray-100 p-4 shadow-sm">
            <button
                id="closebutton"
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border bg-gray-100 text-5xl font-light hover:bg-gray-200"
            >
                ×
            </button>
            <div className="mb-2 mt-5">Title</div>
            <input className="h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"></input>
            <div className="mb-2 mt-5">Notes</div>
            <textarea className="h-40 rounded-md border bg-gray-50 px-2 py-1 focus:shadow-lg focus:outline-none"></textarea>
            <div className="mb-2 mt-5">Category</div>
            <input className="h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"></input>

            <div className="mb-2 mt-5">Start time</div>
            <DatePicker
                className="h-10 w-full rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                showTimeInput
                dateFormat="MMMM d, yyyy HH:mm"
            />
            <div className="mb-2 mt-5">End time</div>
            <DatePicker
                className="h-10 w-full rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
                selected={endDate}
                onChange={(date) => setEndDate(date!)}
                showTimeInput
                dateFormat="MMMM d, yyyy HH:mm"
            />

            <div className="mb-2 mt-5">Color</div>
            <div className="relative">
                <label
                    htmlFor="colorpicker"
                    className="flex h-10 w-full cursor-pointer items-center rounded-md border bg-gray-50 px-2 py-0 focus:shadow-lg focus:outline-none"
                >
                    #ff0000
                </label>
                <input
                    id="colorpicker"
                    type="color"
                    className="absolute left-0 top-0 w-0 opacity-0"
                    onChange={(e) =>
                        ((e.target.parentNode!.parentNode as HTMLElement).style.backgroundColor = e.target.value)
                    }
                ></input>
            </div>

            <label htmlFor="repeattask" className="mb-2 mt-5">
                Number of repeats
            </label>
            <input
                id="repeattask"
                min="0"
                defaultValue={0}
                max="9999"
                type="number"
                className="block h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
            ></input>
            <div className="mb-2 mt-5">Repeat on</div>
            <div className=" flex justify-between">
                <input
                    type="checkbox"
                    id="monday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatMonday"
                    className="hidden"
                ></input>
                <label htmlFor="monday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Mon
                </label>
                <input
                    type="checkbox"
                    id="tuesday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatTuesday"
                    className="hidden"
                ></input>
                <label htmlFor="tuesday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Tue
                </label>
                <input
                    type="checkbox"
                    id="wednesday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatWednesday"
                    className="hidden"
                ></input>
                <label htmlFor="wednesday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Wed
                </label>
                <input
                    type="checkbox"
                    id="thursday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatThursday"
                    className="hidden"
                ></input>
                <label htmlFor="thursday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Thu
                </label>
                <input
                    type="checkbox"
                    id="friday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatFriday"
                    className="hidden"
                ></input>
                <label htmlFor="friday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Fri
                </label>
                <input
                    type="checkbox"
                    id="saturday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatSaturday"
                    className="hidden"
                ></input>
                <label htmlFor="saturday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Sat
                </label>
                <input
                    type="checkbox"
                    id="sunday"
                    onChange={(e) =>
                        ((e.target.nextSibling as HTMLElement).style.opacity = e.target.checked ? '0.8' : '0.2')
                    }
                    name="repeatSunday"
                    className="hidden"
                ></input>
                <label htmlFor="sunday" className="cursor-pointer rounded-md border bg-gray-50 px-1 opacity-20">
                    Sun
                </label>
            </div>
            <button className="mx-auto mb-2 mt-10 flex h-10 w-fit items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg hover:bg-gray-200">
                Save
            </button>
        </div>
    );
}

export default TaskEditor;
