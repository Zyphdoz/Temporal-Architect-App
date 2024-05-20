import { StartdayChoices, settings } from '../services/settings';
import { storage } from '../services/storage';
function Settings() {
    return (
        <div className="flex w-full flex-col bg-gray-50">
            <div className="relative border-b bg-gray-50 pb-3 pt-6 text-left text-4xl shadow-sm">
                <p className="ml-4">Settings</p>
            </div>
            <div className="flex min-w-80 max-w-80 flex-grow flex-col border-r bg-gray-100 p-4 shadow-sm">
                <label className="mb-2 mt-2" htmlFor="cars">
                    First day in calendar:
                </label>
                <select
                    className="mb-2 h-10 rounded-md border bg-gray-50 px-2 focus:shadow-lg focus:outline-none"
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
                <div className="mt-auto">
                    <button
                        className="mx-auto my-4 flex h-10 w-48 items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg shadow-sm hover:bg-gray-200 active:scale-95"
                        onClick={() => storage.downloadBackup()}
                    >
                        Download backup
                    </button>
                    <button
                        className="mx-auto my-4 flex h-10 w-48 items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg shadow-sm hover:bg-gray-200 active:scale-95"
                        onClick={() => document.getElementById('fileupload')?.click()}
                    >
                        Upload backup
                    </button>
                    <input
                        type="file"
                        id="fileupload"
                        className="hidden"
                        onChange={(e) => {
                            const input = e.target as HTMLInputElement;
                            if (input.files && input.files.length > 0) {
                                const file = input.files[0];
                                storage.uploadBackup(file);
                            }
                        }}
                    ></input>
                    <button
                        className="mx-auto my-4 flex h-10 w-48 items-center justify-center rounded-lg border bg-gray-100 px-4 text-lg shadow-sm hover:bg-gray-200 active:scale-95"
                        onClick={() => storage.deleteData()}
                    >
                        Delete data
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
