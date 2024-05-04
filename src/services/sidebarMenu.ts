class Sidebar {
    private menuItems: string[] = ['Calendar', 'Statistics', 'Settings'];

    private selectedItem: string = this.menuItems[0]; //.state

    getSelectedItem(): string {
        return this.selectedItem;
    }

    getMenuItems(): string[] {
        return this.menuItems;
    }

    setSelectedItem(item: string) {
        this.selectedItem = item;
    }
}

export const sidebar = new Sidebar();
