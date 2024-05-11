class TaskEditor {
    private taskEditorIsVisible = false; //.state

    clear() {
        this.taskEditorIsVisible = false;
    }

    isVisible() {
        return this.taskEditorIsVisible;
    }

    open() {
        this.taskEditorIsVisible = true;
    }

    close() {
        this.taskEditorIsVisible = false;
    }
}

export const taskEditor = new TaskEditor();
