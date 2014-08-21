import TodoAppModel = require('TodoAppModel');
import View = require('View');
import Repeater = require('Repeater');
import DomUtils = require('DomUtils');
import TodoAppcss = require('TodoApp.css');

DomUtils.loadStyles(TodoAppcss.styles);

class TodoAppBlock0Item extends View {
    viewName = 'TodoAppBlock0Item';

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("li", [], bindings[0], [
            _this._ce("div", ["class","view"], null, [
                _this._ce("input", ["class","toggle","type","checkbox"], bindings[1]),
                _this._ce("label", [], bindings[2]),
                _this._ce("button", ["class","destroy"], bindings[3])
            ]),
            _this._ce("form", [], bindings[4], [
                _this._ce("input", ["class","edit","todo-escape","revertEditing(todo)","ng-blur","doneEditing(todo)","todo-focus","todo == editedTodo"], bindings[5])
            ])
        ]));
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

class TodoAppBlock0 extends Repeater {
    viewName = 'TodoAppBlock0';
    childViewType = TodoAppBlock0Item;
    itemName = "todo";

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("ul", ["class","todo-list"], bindings[0], this.getChildElements()));
    }

    _bindings = [
        {
            "id": "0",
            "childId": "surface"
        }
    ];
}

class TodoApp extends View {
    viewName = 'TodoApp';
    viewModelType = TodoAppModel;
    todoAppBlock0 = <any>this.addChild(new TodoAppBlock0());

    onInitialize() {
        super.onInitialize();
        this.todoAppBlock0.owner = this;
    }

    onViewModelChanged() {
        super.onViewModelChanged();
        this.todoAppBlock0.setData({ items: this.getValue('todos') });
    }

    onRenderElement(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = _this._ce("div", ["class","approot"], null, [
            _this._ce("section", ["class","todoapp"], null, [
                _this._ce("header", ["class","header"], null, [
                    _this._ce("h1", [], null, [
                        _this._ct("todos")
                    ]),
                    _this._ce("form", ["class","todo-form"], bindings[0], [
                        _this._ce("input", ["class","new-todo","placeholder","What needs to be done?"], bindings[1])
                    ])
                ]),
                _this._ce("section", ["class","main"], bindings[2], [
                    _this._ce("input", ["class","toggle-all","type","checkbox"], bindings[3]),
                    _this._ce("label", ["for","toggle-all"], null, [
                        _this._ct("Mark all as complete")
                    ]),
                    _this.todoAppBlock0.renderElement()
                ]),
                _this._ce("footer", ["class","footer"], bindings[4], [
                    _this._ce("span", ["class","todo-count"], bindings[5]),
                    _this._ce("ul", ["class","filters"], null, [
                        _this._ce("li", [], null, [
                            _this._ce("a", ["href","#/"], bindings[6], [
                                _this._ct("All")
                            ])
                        ]),
                        _this._ce("li", [], null, [
                            _this._ce("a", ["href","#/active"], bindings[7], [
                                _this._ct("Active")
                            ])
                        ]),
                        _this._ce("li", [], null, [
                            _this._ce("a", ["href","#/completed"], bindings[8], [
                                _this._ct("Completed")
                            ])
                        ])
                    ]),
                    _this._ce("button", ["class","clear-completed"], bindings[9])
                ])
            ]),
            _this._ce("footer", ["class","info"], null, [
                _this._ce("p", [], null, [
                    _this._ct("Double-click to edit a todo")
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Credits:\r\n        "),
                    _this._ce("a", ["href","http://github.com/dzearing"], null, [
                        _this._ct("David Zearing")
                    ])
                ]),
                _this._ce("p", [], null, [
                    _this._ct("Part of "),
                    _this._ce("a", ["href","http://todomvc.com"], null, [
                        _this._ct("TodoMVC")
                    ])
                ])
            ])
        ]));
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

export = TodoApp;
