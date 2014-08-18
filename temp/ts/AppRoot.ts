import AppRootModel = require('AppRootModel');
import View = require('View');
import AppRootBase = require('AppRootBase');
import Repeater = require('Repeater');
import DomUtils = require('DomUtils');
import AppRootcss = require('AppRoot.css');

DomUtils.loadStyles(AppRootcss.styles);

class AppRootBlock0Item extends View {
    viewName = 'AppRootBlock0Item';

    onRenderHtml(): string {
        return '' +
            '<li id="' + this.id + '_0" ' + this._genClass('', ['completed','todo.isCompleted','editing','todo.isEditing']) + '>' +
                '<div class="view">' +
                    '<input id="' + this.id + '_1" ' + this._genAttr('', ['checked','todo.isCompleted']) + ' class="toggle" type="checkbox"></input>' +
                    '<label id="' + this.id + '_2">' +
                        this._genText('todo.title') +
                    '</label>' +
                    '<button id="' + this.id + '_3" class="destroy"></button>' +
                '</div>' +
                '<form id="' + this.id + '_4">' +
                    '<input id="' + this.id + '_5" ' + this._genAttr('', ['value','todo.title']) + ' class="edit" todo-escape="revertEditing(todo)" ng-blur="doneEditing(todo)" todo-focus="todo == editedTodo"></input>' +
                '</form>' +
            '</li>' +
            '';
    }

    _bindings = [
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

class AppRootBlock0 extends Repeater {
    viewName = 'AppRootBlock0';
    childViewType = AppRootBlock0Item;
    itemName = "todo";

    onRenderHtml(): string {
        return '' +
            '<ul id="' + this.id + '_0" class="todo-list">' +
                this.renderItems() + 
            '</ul>' +
            '';
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class AppRoot extends AppRootBase {
    viewName = 'AppRoot';
    viewModelType = AppRootModel;
    appRootBlock0 = <any>this.addChild(new AppRootBlock0());

    onInitialize() {
        super.onInitialize();
        this.appRootBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.appRootBlock0.setData({ items: this.getValue('todos') });
    }

    onRenderHtml(): string {
        return '' +
            '<section class="todoapp">' +
                '<header class="header">' +
                    '<h1>' +
                        'todos' +
                    '</h1>' +
                    '<form id="' + this.id + '_0" class="todo-form">' +
                        '<input id="' + this.id + '_1" ' + this._genAttr('', ['value','newTodo']) + ' class="new-todo" placeholder="What needs to be done?"></input>' +
                    '</form>' +
                '</header>' +
                '<section id="' + this.id + '_2" ' + this._genClass('main', ['visible','todos.getCount']) + '>' +
                    '<input id="' + this.id + '_3" ' + this._genAttr('', ['checked','areAllComplete']) + ' class="toggle-all" type="checkbox"></input>' +
                    '<label for="toggle-all">' +
                        'Mark all as complete' +
                    '</label>' +
                    this.appRootBlock0.renderHtml() +
                '</section>' +
                '<footer id="' + this.id + '_4" ' + this._genClass('footer', ['visible','todos.getCount']) + '>' +
                    '<span id="' + this.id + '_5" class="todo-count">' +
                        this._genHtml('undefined') +
                    '</span>' +
                    '<ul class="filters">' +
                        '<li>' +
                            '<a id="' + this.id + '_6" ' + this._genClass('', ['selected','allSelected']) + ' href="#/">' +
                                'All' +
                            '</a>' +
                        '</li>' +
                        '<li>' +
                            '<a id="' + this.id + '_7" ' + this._genClass('', ['selected','activeSelected']) + ' href="#/active">' +
                                'Active' +
                            '</a>' +
                        '</li>' +
                        '<li>' +
                            '<a id="' + this.id + '_8" ' + this._genClass('', ['selected','completedSelected']) + ' href="#/completed">' +
                                'Completed' +
                            '</a>' +
                        '</li>' +
                    '</ul>' +
                    '<button id="' + this.id + '_9" ' + this._genClass('clear-completed', ['visible','completedCount']) + '>' +
                        this._genText('completedCountMessage') +
                    '</button>' +
                '</footer>' +
            '</section>' +
            '<footer class="info">' +
                '<p>' +
                    'Double-click to edit a todo' +
                '</p>' +
                '<p>' +
                    'Credits:' +
                    '<a href="http://github.com/dzearing">' +
                        'David Zearing' +
                    '</a>' +
                '</p>' +
                '<p>' +
                    'Part of' +
                    '<a href="http://todomvc.com">' +
                        'TodoMVC' +
                    '</a>' +
                '</p>' +
            '</footer>' +
            '';
    }

    _bindings = [
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

export = AppRoot;
