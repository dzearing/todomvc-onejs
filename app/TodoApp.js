var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'TodoAppModel', 'View', 'Repeater', 'DomUtils', 'TodoApp.css'], function(require, exports, TodoAppModel, View, Repeater, DomUtils, TodoAppcss) {
    DomUtils.loadStyles(TodoAppcss.styles);

    var TodoAppBlock0Item = (function (_super) {
        __extends(TodoAppBlock0Item, _super);
        function TodoAppBlock0Item() {
            _super.apply(this, arguments);
            this.viewName = 'TodoAppBlock0Item';
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
        TodoAppBlock0Item.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("li", [], bindings[0], [
                _this._ce("div", ["class", "view"], null, [
                    _this._ce("input", ["class", "toggle", "type", "checkbox"], bindings[1]),
                    _this._ce("label", [], bindings[2]),
                    _this._ce("button", ["class", "destroy"], bindings[3])
                ]),
                _this._ce("form", [], bindings[4], [
                    _this._ce("input", ["class", "edit", "todo-escape", "revertEditing(todo)", "ng-blur", "doneEditing(todo)", "todo-focus", "todo == editedTodo"], bindings[5])
                ])
            ]));
        };
        return TodoAppBlock0Item;
    })(View);

    var TodoAppBlock0 = (function (_super) {
        __extends(TodoAppBlock0, _super);
        function TodoAppBlock0() {
            _super.apply(this, arguments);
            this.viewName = 'TodoAppBlock0';
            this.childViewType = TodoAppBlock0Item;
            this.itemName = "todo";
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        TodoAppBlock0.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("ul", ["class", "todo-list"], bindings[0], this.getChildElements()));
        };
        return TodoAppBlock0;
    })(Repeater);

    var TodoApp = (function (_super) {
        __extends(TodoApp, _super);
        function TodoApp() {
            _super.apply(this, arguments);
            this.viewName = 'TodoApp';
            this.viewModelType = TodoAppModel;
            this.todoAppBlock0 = this.addChild(new TodoAppBlock0());
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
        TodoApp.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this.todoAppBlock0.owner = this;
        };

        TodoApp.prototype.onViewModelChanged = function () {
            _super.prototype.onViewModelChanged.call(this);
            this.todoAppBlock0.setData({ items: this.getValue('todos') });
        };

        TodoApp.prototype.onRenderElement = function () {
            var _this = this;
            var bindings = _this._bindings;

            return (_this.element = _this._ce("div", ["class", "approot"], null, [
                _this._ce("section", ["class", "todoapp"], null, [
                    _this._ce("header", ["class", "header"], null, [
                        _this._ce("h1", [], null, [
                            _this._ct("todos")
                        ]),
                        _this._ce("form", ["class", "todo-form"], bindings[0], [
                            _this._ce("input", ["class", "new-todo", "placeholder", "What needs to be done?"], bindings[1])
                        ])
                    ]),
                    _this._ce("section", ["class", "main"], bindings[2], [
                        _this._ce("input", ["class", "toggle-all", "type", "checkbox"], bindings[3]),
                        _this._ce("label", ["for", "toggle-all"], null, [
                            _this._ct("Mark all as complete")
                        ]),
                        _this.todoAppBlock0.renderElement()
                    ]),
                    _this._ce("footer", ["class", "footer"], bindings[4], [
                        _this._ce("span", ["class", "todo-count"], bindings[5]),
                        _this._ce("ul", ["class", "filters"], null, [
                            _this._ce("li", [], null, [
                                _this._ce("a", ["href", "#/"], bindings[6], [
                                    _this._ct("All")
                                ])
                            ]),
                            _this._ce("li", [], null, [
                                _this._ce("a", ["href", "#/active"], bindings[7], [
                                    _this._ct("Active")
                                ])
                            ]),
                            _this._ce("li", [], null, [
                                _this._ce("a", ["href", "#/completed"], bindings[8], [
                                    _this._ct("Completed")
                                ])
                            ])
                        ]),
                        _this._ce("button", ["class", "clear-completed"], bindings[9])
                    ])
                ]),
                _this._ce("footer", ["class", "info"], null, [
                    _this._ce("p", [], null, [
                        _this._ct("Double-click to edit a todo")
                    ]),
                    _this._ce("p", [], null, [
                        _this._ct("Credits:\r\n        "),
                        _this._ce("a", ["href", "http://github.com/dzearing"], null, [
                            _this._ct("David Zearing")
                        ])
                    ]),
                    _this._ce("p", [], null, [
                        _this._ct("Part of "),
                        _this._ce("a", ["href", "http://todomvc.com"], null, [
                            _this._ct("TodoMVC")
                        ])
                    ])
                ])
            ]));
        };
        return TodoApp;
    })(View);

    
    return TodoApp;
});
