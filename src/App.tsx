import SidebarMenu from './components/SidebarMenu';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import { sidebar } from './services/sidebarMenu'; //.state

function App() {
    return (
        <div className="flex">
            <SidebarMenu></SidebarMenu>
            {sidebar.getSelectedItem() === 'Calendar' && <Calendar></Calendar>}
            {sidebar.getSelectedItem() === 'Statistics' && <Statistics></Statistics>}
            {sidebar.getSelectedItem() === 'Settings' && <Settings></Settings>}
        </div>
    );
}

export default App;
