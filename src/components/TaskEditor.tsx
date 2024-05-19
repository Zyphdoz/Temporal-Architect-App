import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { taskEditor } from '../services/taskEditor'; //.state
import { calendar } from '../services/calendar';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { storage } from '../services/storage';

function TaskEditor() {
    const task = taskEditor.getTask();
    const inputStyle = 'h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none';
    const checkboxStyleUnchecked =
        'cursor-pointer select-none rounded-md border bg-gray-50 px-1 opacity-20 hover:opacity-40';
    const checkboxStyleChecked = 'cursor-pointer select-none rounded-md border bg-gray-50 px-1 opacity-80';

    return (
        taskEditor.isVisible() && (
            <div
                id="taskeditorcontainer"
                className="flex min-w-80 max-w-80 flex-grow flex-col border-r bg-gray-100 p-4 shadow-sm"
                style={{ background: task.backgroundColor }}
            >
                <button
                    id="closebutton"
                    onClick={() => taskEditor.close()}
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border bg-gray-100 text-5xl font-light hover:bg-gray-200"
                >
                    ×
                </button>
                <label htmlFor="title" className="mb-2 mt-2">
                    Title
                </label>
                <input
                    id="title"
                    className={inputStyle}
                    value={task.title}
                    onChange={(e) => taskEditor.setTitle(e.target.value)}
                ></input>
                <label htmlFor="notes" className="mb-2 mt-5">
                    Notes
                </label>
                <textarea
                    id="notes"
                    className={`${inputStyle} h-20 py-1`}
                    value={task.description}
                    onChange={(e) => taskEditor.setDescription(e.target.value)}
                ></textarea>
                <label htmlFor="category" className="mb-2 mt-5">
                    Category
                </label>
                <input
                    id="category"
                    className={inputStyle}
                    value={task.category}
                    onChange={(e) => taskEditor.setCategory(e.target.value)}
                ></input>

                <label htmlFor="starttime" className="mb-2 mt-5">
                    Start time
                </label>
                <DatePicker
                    id="starttime"
                    className={`${inputStyle} w-full`}
                    selected={task.startTime}
                    onChange={(date) => taskEditor.setStartTime(date!)}
                    showTimeInput
                    dateFormat="MMMM d, yyyy HH:mm"
                />
                <label htmlFor="endtime" className="mb-2 mt-5">
                    End time
                </label>
                <DatePicker
                    id="endtime"
                    className={`${inputStyle} w-full`}
                    selected={task.endTime}
                    onChange={(date) => taskEditor.setEndTime(date!)}
                    showTimeInput
                    dateFormat="MMMM d, yyyy HH:mm"
                />

                <div className="mb-2 mt-5">Color</div>
                <div className="relative">
                    <label
                        htmlFor="colorpicker"
                        className="flex h-10 w-full cursor-pointer items-center rounded-md border bg-gray-50 px-2 py-0 focus:shadow-lg focus:outline-none"
                    >
                        {task.backgroundColor.toUpperCase()}
                    </label>
                    <input
                        id="colorpicker"
                        type="color"
                        className="absolute left-0 top-0 w-0 opacity-0"
                        onChange={(e) => taskEditor.setColor(e.target.value)}
                    ></input>
                </div>

                <label htmlFor="repeattask" className="mb-2 mt-5">
                    Number of repeats
                </label>
                <input
                    id="repeattask"
                    min="0"
                    value={task.numRepeats}
                    onChange={(e) => {
                        if (e.target.value !== '') {
                            let value = parseInt(e.target.value);
                            if (value > 999) value = task.numRepeats;
                            taskEditor.setRepeats(value);
                        } else {
                            // @ts-ignore
                            // allow user to delete the entire content of the input for intuitive UX
                            taskEditor.setRepeats('');
                        }
                    }}
                    max="999"
                    type="number"
                    className={inputStyle}
                ></input>
                <div className="mb-2 mt-5">Repeat on</div>
                <div className=" flex justify-between">
                    <input
                        type="checkbox"
                        id="monday"
                        checked={task.repeatMonday}
                        onChange={() => taskEditor.toggleRepeatMonday()}
                        name="repeatMonday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="monday"
                        className={task.repeatMonday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Mon
                    </label>
                    <input
                        type="checkbox"
                        id="tuesday"
                        checked={task.repeatTuesday}
                        onChange={() => taskEditor.toggleRepeatTuesday()}
                        name="repeatTuesday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="tuesday"
                        className={task.repeatTuesday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Tue
                    </label>
                    <input
                        type="checkbox"
                        id="wednesday"
                        checked={task.repeatWednesday}
                        onChange={() => taskEditor.toggleRepeatWednesday()}
                        name="repeatWednesday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="wednesday"
                        className={task.repeatWednesday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Wed
                    </label>
                    <input
                        type="checkbox"
                        id="thursday"
                        checked={task.repeatThursday}
                        onChange={() => taskEditor.toggleRepeatThursday()}
                        name="repeatThursday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="thursday"
                        className={task.repeatThursday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Thu
                    </label>
                    <input
                        type="checkbox"
                        id="friday"
                        checked={task.repeatFriday}
                        onChange={() => taskEditor.toggleRepeatFriday()}
                        name="repeatFriday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="friday"
                        className={task.repeatFriday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Fri
                    </label>
                    <input
                        type="checkbox"
                        id="saturday"
                        checked={task.repeatSaturday}
                        onChange={() => taskEditor.toggleRepeatSaturday()}
                        name="repeatSaturday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="saturday"
                        className={task.repeatSaturday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Sat
                    </label>
                    <input
                        type="checkbox"
                        id="sunday"
                        checked={task.repeatSunday}
                        onChange={() => taskEditor.toggleRepeatSunday()}
                        name="repeatSunday"
                        className="hidden"
                    ></input>
                    <label
                        htmlFor="sunday"
                        className={task.repeatSunday ? checkboxStyleChecked : checkboxStyleUnchecked}
                    >
                        Sun
                    </label>
                </div>
                <button
                    className="mx-auto mb-2 mt-10 flex h-10 w-fit items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg shadow-sm hover:bg-gray-200"
                    onClick={() => {
                        if (task.startTime >= task.endTime) {
                            taskEditor.setErrorMessage('End time must be after Start time.');
                        } else if (
                            task.numRepeats > 1 &&
                            task.repeatMonday === false &&
                            task.repeatTuesday === false &&
                            task.repeatWednesday === false &&
                            task.repeatThursday === false &&
                            task.repeatFriday === false &&
                            task.repeatSaturday === false &&
                            task.repeatSunday === false
                        ) {
                            taskEditor.setErrorMessage('Pick repeat days or set repeats to 0.');
                        } else {
                            calendar.addTask(task);
                            const successMessage = `Added ${task.numRepeats === 0 ? '1' : task.numRepeats} task${task.numRepeats > 1 ? 's' : ''}`;
                            taskEditor.setSuccessMessage(successMessage);
                            storage.save();
                            taskEditor.clear();
                            setTimeout(() => {
                                taskEditor.setSuccessMessage('');
                            }, 3000);
                        }
                    }}
                >
                    Save
                </button>
                <ErrorMessage errorMessage={taskEditor.getErrorMessage()}></ErrorMessage>
                <SuccessMessage successMessage={taskEditor.getSuccessMessage()}></SuccessMessage>
            </div>
        )
    );
}

export default TaskEditor;
