import logo from '../assets/logo.png';
import { sidebar } from '../services/sidebarMenu.ts'; //.state

function SidebarMenu() {
    return (
        <aside className="h-screen w-56">
            <nav className="flex h-full flex-col border-r bg-gray-100 shadow-sm">
                <div className="flex items-center justify-between p-4 pb-2">
                    <img
                        src={logo}
                        className="w-20 rounded-full"
                        alt="A minimalistic logo with a clock and some abstract shapes, symbolizing the precision and intentionality of a temporal architect’s approach to time management"
                    ></img>
                    <h1 className="rounded-md bg-white p-1.5">Temporal Architect App</h1>
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
