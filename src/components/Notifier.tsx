import { useEffect } from 'react';
import { calendar } from '../services/calendar';

function Notifier() {
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

            if (Notification.permission === 'granted' && task.title !== prevTitle && prevTitle !== '') {
                new Notification(`${prevTitle} starts now`);
            }

            prevTitle = task.title;
            document.title = title;
        }, 2000);

        return () => {
            clearInterval(countDownToNextTaskInTitle);
        };
    }, []);
    return <></>;
}

export default Notifier;
