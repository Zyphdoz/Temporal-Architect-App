import SidebarMenu from './components/SidebarMenu';
import Calendar from './components/Calendar';
import { sidebar } from './services/sidebarMenu'; //.state

function App() {
    return (
        <div className="flex">
            <SidebarMenu></SidebarMenu>
            {sidebar.getSelectedItem() === 'Calendar' && <Calendar></Calendar>}
        </div>
    );
}

export default App;
