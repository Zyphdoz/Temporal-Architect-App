import CalendarDay from './components/Calendar';
import CalendarEvent from './components/CalendarDay';
import SidebarMenu from './components/SidebarMenu';
import Calendar from './components/Calendar';

function App() {
    return (
        <div className="flex">
            <SidebarMenu></SidebarMenu>
            <Calendar></Calendar>
        </div>
    );
}

export default App;
