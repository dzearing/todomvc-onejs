import ViewModel = require('ViewModel');

class TodoModel extends ViewModel {
    title: string;
    isCompleted = false;
    isEditing = false;

    _tempTitle: string;

    constructor(todo: string) {
        super();
        this.title = todo;
    }

    edit() {
        this.isEditing = true;
        this._tempTitle = this.title;
        this.change();

        return false;
    }

    doneEditing() {
        this.isEditing = false;
        this.change();

        return false;
    }

    revertEdit() {
        this.title = this._tempTitle;
        this.isEditing = false;
        this.change();
    }
}

export = TodoModel;
