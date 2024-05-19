import { StartdayChoices, settings } from '../services/settings';
import { storage } from '../services/storage';
function Settings() {
    return (
        <div className="flex min-w-80 max-w-80 flex-grow flex-col border-r bg-gray-100 p-4 shadow-sm">
            <label className="mb-2 mt-2" htmlFor="cars">
                First day in calendar:
            </label>
            <select
                className="h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
                name="cars"
                id="cars"
                defaultValue={settings.getCalendarStartDay()}
                onChange={(e) => {
                    settings.setCalendarStartDay(e.target.value as StartdayChoices);
                    storage.save();
                }}
            >
                <option value="Today">Today</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
        </div>
    );
}

export default Settings;
