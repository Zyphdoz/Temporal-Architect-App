import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { taskEditor } from '../services/taskEditor'; //.state
import { calendar } from '../services/calendar';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

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
                className="flex min-w-80 flex-col border-r bg-gray-100 p-4 shadow-sm"
                style={{ background: task.backgroundColor }}
            >
                <button
                    id="closebutton"
                    onClick={() => taskEditor.close()}
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border bg-gray-100 text-5xl font-light hover:bg-gray-200"
                >
                    ×
                </button>
                <div className="mb-2 mt-5">Title</div>
                <input
                    className={inputStyle}
                    value={task.title}
                    onChange={(e) => taskEditor.setTitle(e.target.value)}
                ></input>
                <div className="mb-2 mt-5">Notes</div>
                <textarea
                    className={`${inputStyle} h-40 py-1`}
                    value={task.description}
                    onChange={(e) => taskEditor.setDescription(e.target.value)}
                ></textarea>
                <div className="mb-2 mt-5">Category</div>
                <input
                    className={inputStyle}
                    value={task.category}
                    onChange={(e) => taskEditor.setCategory(e.target.value)}
                ></input>

                <div className="mb-2 mt-5">Start time</div>
                <DatePicker
                    className={`${inputStyle} w-full`}
                    selected={task.startTime}
                    onChange={(date) => taskEditor.setStartTime(date!)}
                    showTimeInput
                    dateFormat="MMMM d, yyyy HH:mm"
                />
                <div className="mb-2 mt-5">End time</div>
                <DatePicker
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
                    onChange={(e) => taskEditor.setRepeats(parseInt(e.target.value))}
                    max="9999"
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
                    className="mx-auto mb-2 mt-10 flex h-10 w-fit items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg hover:bg-gray-200"
                    onClick={() => {
                        if (task.startTime < task.endTime) {
                            calendar.addTask(task);
                            const successMessage = `Added ${task.numRepeats === 0 ? '1' : task.numRepeats} task${task.numRepeats > 1 ? 's' : ''}`;
                            taskEditor.setSuccessMessage(successMessage);
                            taskEditor.clear();
                            setTimeout(() => {
                                taskEditor.setSuccessMessage('');
                            }, 3000);
                        } else {
                            taskEditor.setErrorMessage(
                                'A task must begin before it can end. Please double check your start and end times and make sure End time comes after Start time.',
                            );
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
