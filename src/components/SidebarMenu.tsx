import { useEffect } from 'react';
import logo from '../assets/logo.png';
import { sidebar } from '../services/sidebarMenu.ts'; //.state
import { calendar } from '../services/calendar.ts';

function SidebarMenu() {
    useEffect(() => {
        let prevTitle = calendar.nextUpcomingTask().title;

        const countDownToNextTaskInTitle = setInterval(() => {
            const task = calendar.nextUpcomingTask();
            const startTime = task.startTime.getTime();
            const rightNow = new Date().getTime();
            const timeToNextTask = startTime - rightNow;
            const hoursToNextTask = Math.floor(timeToNextTask / 3600000);
            const minutesToNextTask = Math.floor(timeToNextTask / 60000) - hoursToNextTask * 60;

            const minutesToNextTaskPadded = minutesToNextTask.toString().padStart(2, '0');

            let title =
                task.title === ''
                    ? 'Temporal Architect App'
                    : `${task.title} in ${hoursToNextTask}:${minutesToNextTaskPadded}`;

            if (title !== 'Temporal Architect App' && timeToNextTask < 60000) {
                title = `${task.title} soon`;
            }

            if (Notification.permission === 'granted' && task.title !== prevTitle) {
                new Notification(`${prevTitle === '' ? 'untitled task' : prevTitle} starts now`);
            }

            prevTitle = task.title;
            document.title = title;
        }, 2000);

        return () => {
            clearInterval(countDownToNextTaskInTitle);
        };
    }, []);
    return (
        <aside className="h-screen min-w-32 max-w-32">
            <nav className="flex h-full flex-col border-r bg-gray-100 shadow-sm">
                <div className="flex items-center justify-between p-4 pb-2">
                    <img
                        src={logo}
                        className="w-20 rounded-full"
                        alt="A minimalistic logo with a clock and some abstract shapes, symbolizing the precision and intentionality of a temporal architect’s approach to time management"
                    ></img>
                </div>

                <ul className="mt-4 flex-1 px-4 checked:bg-gray-200">
                    {sidebar.getMenuItems().map((menuItem, i) => (
                        <li
                            key={i}
                            className={`my-1 cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200 ${sidebar.getSelectedItem() === menuItem ? 'bg-gray-200' : ''}`}
                            onClick={() => sidebar.setSelectedItem(menuItem)}
                        >
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    value={menuItem}
                                    checked={sidebar.getSelectedItem() === menuItem}
                                    onChange={() => sidebar.setSelectedItem(menuItem)}
                                    className="hidden"
                                ></input>
                                {menuItem}
                            </label>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default SidebarMenu;
