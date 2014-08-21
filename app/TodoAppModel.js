var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel', 'List', 'TodoModel'], function(require, exports, ViewModel, List, TodoModel) {
    var AppRootModel = (function (_super) {
        __extends(AppRootModel, _super);
        function AppRootModel() {
            _super.apply(this, arguments);
            this.newTodo = '';
            this.todos = new List();
            this.allChecked = false;
        }
        AppRootModel.prototype.addTodo = function () {
            this.todos.insertAt(0, new TodoModel(this.newTodo));
            this.newTodo = '';
            this.change();

            return false;
        };

        AppRootModel.prototype.countTodos = function (cb) {
            var count = 0;

            for (var i = 0; i < this.todos.getCount(); i++) {
                if (cb(this.todos.getAt(i))) {
                    count++;
                }
            }

            return count;
        };

        AppRootModel.prototype.completedCount = function () {
            return this.countTodos(function (todo) {
                return todo.isCompleted;
            });
        };

        AppRootModel.prototype.remainingCountMessage = function () {
            var count = this.countTodos(function (todo) {
                return !todo.isCompleted;
            });

            return '<strong>' + count + '</strong> item' + (count == 1 ? '' : 's') + ' remaining';
        };

        AppRootModel.prototype.completedCountMessage = function () {
            var count = this.completedCount();

            return 'Clear completed (' + count + ')';
        };

        AppRootModel.prototype.clearCompletedTodos = function () {
            for (var i = 0; i < this.todos.getCount(); i++) {
                if (this.todos.getAt(i).isCompleted) {
                    this.todos.removeAt(i--);
                }
            }
        };

        AppRootModel.prototype.areAllComplete = function () {
            var complete = true;

            for (var i = 0; i < this.todos.getCount(); i++) {
                if (!this.todos.getAt(i).isCompleted) {
                    complete = false;
                    break;
                }
            }

            return complete;
        };

        AppRootModel.prototype.markAll = function () {
            var allOn = !this.areAllComplete();

            for (var i = 0; i < this.todos.getCount(); i++) {
                this.todos.getAt(i).setData({ isCompleted: allOn });
            }

            return false;
        };

        AppRootModel.prototype.removeTodo = function (todo) {
            this.todos.remove(todo);
        };
        return AppRootModel;
    })(ViewModel);

    
    return AppRootModel;
});
