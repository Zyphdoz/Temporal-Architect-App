import CalendarEvent from './components/CalendarEvent';
import SidebarMenu from './components/SidebarMenu';
import { calendar } from './services/calendar';

function App() {
    return (
        <div className="flex">
            <SidebarMenu></SidebarMenu>
            <CalendarEvent task={calendar.getTasksForDay(new Date())}></CalendarEvent>
        </div>
    );
}

export default App;
