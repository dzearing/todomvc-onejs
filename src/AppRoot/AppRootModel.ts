import ViewModel = require('ViewModel');
import List = require('List');
import TodoModel = require('TodoModel');


class AppRootModel extends ViewModel {
    newTodo: string = '';
    todos = new List();
    allChecked = false;

    addTodo() {
        this.todos.insertAt(0, new TodoModel(this.newTodo));
        this.newTodo = '';
        this.change();

        return false;
    }

    countTodos(cb) {
        var count = 0;

        for (var i = 0; i < this.todos.getCount(); i++) {
            if (cb(this.todos.getAt(i))) {
                count++;
            }
        }

        return count;
    }

    completedCount() {
        return this.countTodos(function(todo) { return todo.isCompleted; });
    }

    remainingCountMessage() {
        var count = this.countTodos(function(todo) { return !todo.isCompleted; });

        return '<strong>' + count + '</strong> item' + (count == 1 ? '': 's') + ' remaining';
    }

    completedCountMessage() {
        var count = this.completedCount();

        return 'Clear completed (' + count + ')';
    }

    clearCompletedTodos() {
        for (var i = 0; i < this.todos.getCount(); i++) {
            if (this.todos.getAt(i).isCompleted) {
                this.todos.removeAt(i--);
            }
        }
    }

    areAllComplete() {
        var complete = true;

        for (var i = 0; i < this.todos.getCount(); i++) {
            if (!this.todos.getAt(i).isCompleted) {
                complete = false;
                break;
            }
        }

        return complete;
    }

    markAll() {
        var allOn = !this.areAllComplete();

        for (var i =0; i < this.todos.getCount(); i++) {
            this.todos.getAt(i).setData({ isCompleted: allOn });
        }
    }

    removeTodo(todo) {
        this.todos.remove(todo);
    }
}

export = AppRootModel;