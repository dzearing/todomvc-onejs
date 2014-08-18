var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'AppRootModel', 'View', 'AppRootBase', 'Repeater', 'DomUtils', 'AppRoot.css'], function(require, exports, AppRootModel, View, AppRootBase, Repeater, DomUtils, AppRootcss) {
    DomUtils.loadStyles(AppRootcss.styles);

    var AppRootBlock0Item = (function (_super) {
        __extends(AppRootBlock0Item, _super);
        function AppRootBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'AppRootBlock0Item';
            this._bindings = [
                {
                    "id": "0",
                    "className": {
                        "completed": "todo.isCompleted",
                        "editing": "todo.isEditing"
                    }
                },
                {
                    "id": "1",
                    "attr": {
                        "checked": "todo.isCompleted"
                    }
                },
                {
                    "id": "2",
                    "text": "todo.title",
                    "events": {
                        "dblclick": [
                            "$view.toggle(todo.edit)"
                        ]
                    }
                },
                {
                    "id": "3",
                    "events": {
                        "click": [
                            "$parent.removeTodo(todo)"
                        ]
                    }
                },
                {
                    "id": "4",
                    "events": {
                        "submit": [
                            "todo.doneEditing"
                        ]
                    }
                },
                {
                    "id": "5",
                    "attr": {
                        "value": "todo.title"
                    }
                }
            ];
        }
        AppRootBlock0Item.prototype.onRenderHtml = function () {
            return '' + '<li id="' + this.id + '_0" ' + this._genClass('', ['completed', 'todo.isCompleted', 'editing', 'todo.isEditing']) + '>' + '<div class="view">' + '<input id="' + this.id + '_1" ' + this._genAttr('', ['checked', 'todo.isCompleted']) + ' class="toggle" type="checkbox"></input>' + '<label id="' + this.id + '_2">' + this._genText('todo.title') + '</label>' + '<button id="' + this.id + '_3" class="destroy"></button>' + '</div>' + '<form id="' + this.id + '_4">' + '<input id="' + this.id + '_5" ' + this._genAttr('', ['value', 'todo.title']) + ' class="edit" todo-escape="revertEditing(todo)" ng-blur="doneEditing(todo)" todo-focus="todo == editedTodo"></input>' + '</form>' + '</li>' + '';
        };
        return AppRootBlock0Item;
    })(View);

    var AppRootBlock0 = (function (_super) {
        __extends(AppRootBlock0, _super);
        function AppRootBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'AppRootBlock0';
            this.childViewType = AppRootBlock0Item;
            this.itemName = "todo";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        AppRootBlock0.prototype.onRenderHtml = function () {
            return '' + '<ul id="' + this.id + '_0" class="todo-list">' + this.renderItems() + '</ul>' + '';
        };
        return AppRootBlock0;
    })(Repeater);

    var AppRoot = (function (_super) {
        __extends(AppRoot, _super);
        function AppRoot() {
            _super.apply(this, arguments);
            this.viewName = 'AppRoot';
            this.viewModelType = AppRootModel;
            this.appRootBlock0 = this.addChild(new AppRootBlock0());
            this._bindings = [
                {
                    "id": "0",
                    "events": {
                        "submit": [
                            "addTodo"
                        ]
                    }
                },
                {
                    "id": "1",
                    "attr": {
                        "value": "newTodo"
                    }
                },
                {
                    "id": "2",
                    "className": {
                        "visible": "todos.getCount"
                    }
                },
                {
                    "id": "3",
                    "attr": {
                        "checked": "areAllComplete"
                    },
                    "events": {
                        "click": [
                            "markAll"
                        ]
                    }
                },
                {
                    "id": "4",
                    "className": {
                        "visible": "todos.getCount"
                    }
                },
                {
                    "id": "5",
                    "html": "remainingCountMessage"
                },
                {
                    "id": "6",
                    "className": {
                        "selected": "allSelected"
                    }
                },
                {
                    "id": "7",
                    "className": {
                        "selected": "activeSelected"
                    }
                },
                {
                    "id": "8",
                    "className": {
                        "selected": "completedSelected"
                    }
                },
                {
                    "id": "9",
                    "text": "completedCountMessage",
                    "className": {
                        "visible": "completedCount"
                    },
                    "events": {
                        "click": [
                            "clearCompletedTodos"
                        ]
                    }
                }
            ];
        }
        AppRoot.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.appRootBlock0.owner = this;
        };

        AppRoot.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.appRootBlock0.setData({ items: this.getValue('todos') });
        };

        AppRoot.prototype.onRenderHtml = function () {
            return '' + '<section class="todoapp">' + '<header class="header">' + '<h1>' + 'todos' + '</h1>' + '<form id="' + this.id + '_0" class="todo-form">' + '<input id="' + this.id + '_1" ' + this._genAttr('', ['value', 'newTodo']) + ' class="new-todo" placeholder="What needs to be done?"></input>' + '</form>' + '</header>' + '<section id="' + this.id + '_2" ' + this._genClass('main', ['visible', 'todos.getCount']) + '>' + '<input id="' + this.id + '_3" ' + this._genAttr('', ['checked', 'areAllComplete']) + ' class="toggle-all" type="checkbox"></input>' + '<label for="toggle-all">' + 'Mark all as complete' + '</label>' + this.appRootBlock0.renderHtml() + '</section>' + '<footer id="' + this.id + '_4" ' + this._genClass('footer', ['visible', 'todos.getCount']) + '>' + '<span id="' + this.id + '_5" class="todo-count">' + this._genHtml('undefined') + '</span>' + '<ul class="filters">' + '<li>' + '<a id="' + this.id + '_6" ' + this._genClass('', ['selected', 'allSelected']) + ' href="#/">' + 'All' + '</a>' + '</li>' + '<li>' + '<a id="' + this.id + '_7" ' + this._genClass('', ['selected', 'activeSelected']) + ' href="#/active">' + 'Active' + '</a>' + '</li>' + '<li>' + '<a id="' + this.id + '_8" ' + this._genClass('', ['selected', 'completedSelected']) + ' href="#/completed">' + 'Completed' + '</a>' + '</li>' + '</ul>' + '<button id="' + this.id + '_9" ' + this._genClass('clear-completed', ['visible', 'completedCount']) + '>' + this._genText('completedCountMessage') + '</button>' + '</footer>' + '</section>' + '<footer class="info">' + '<p>' + 'Double-click to edit a todo' + '</p>' + '<p>' + 'Credits:' + '<a href="http://github.com/dzearing">' + 'David Zearing' + '</a>' + '</p>' + '<p>' + 'Part of' + '<a href="http://todomvc.com">' + 'TodoMVC' + '</a>' + '</p>' + '</footer>' + '';
        };
        return AppRoot;
    })(AppRootBase);

    
    return AppRoot;
});
