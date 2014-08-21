var __extends=this.__extends||function(e,t){function o(){this.constructor=e}for(var l in t)t.hasOwnProperty(l)&&(e[l]=t[l]);o.prototype=t.prototype,e.prototype=new o};define(["require","exports","TodoAppModel","View","Repeater","DomUtils","TodoApp.css"],function(e,t,o,l,i,n,c){n.loadStyles(c.styles);var s=function(e){function t(){e.apply(this,arguments),this.viewName="TodoAppBlock0Item",this._bindings=[{id:"0",className:{completed:"todo.isCompleted",editing:"todo.isEditing"}},{id:"1",attr:{checked:"todo.isCompleted"}},{id:"2",text:"todo.title",events:{dblclick:["$view.toggle(todo.edit)"]}},{id:"3",events:{click:["$parent.removeTodo(todo)"]}},{id:"4",events:{submit:["todo.doneEditing"]}},{id:"5",attr:{value:"todo.title"}}]}return __extends(t,e),t.prototype.onRenderElement=function(){var e=this,t=e._bindings;return e.element=e._ce("li",[],t[0],[e._ce("div",["class","view"],null,[e._ce("input",["class","toggle","type","checkbox"],t[1]),e._ce("label",[],t[2]),e._ce("button",["class","destroy"],t[3])]),e._ce("form",[],t[4],[e._ce("input",["class","edit","todo-escape","revertEditing(todo)","ng-blur","doneEditing(todo)","todo-focus","todo == editedTodo"],t[5])])])},t}(l),d=function(e){function t(){e.apply(this,arguments),this.viewName="TodoAppBlock0",this.childViewType=s,this.itemName="todo",this._bindings=[{id:"0",childId:"surface"}]}return __extends(t,e),t.prototype.onRenderElement=function(){var e=this,t=e._bindings;return e.element=e._ce("ul",["class","todo-list"],t[0],this.getChildElements())},t}(i),a=function(e){function t(){e.apply(this,arguments),this.viewName="TodoApp",this.viewModelType=o,this.todoAppBlock0=this.addChild(new d),this._bindings=[{id:"0",events:{submit:["addTodo"]}},{id:"1",attr:{value:"newTodo"}},{id:"2",className:{visible:"todos.getCount"}},{id:"3",attr:{checked:"areAllComplete"},events:{click:["markAll"]}},{id:"4",className:{visible:"todos.getCount"}},{id:"5",html:"remainingCountMessage"},{id:"6",className:{selected:"allSelected"}},{id:"7",className:{selected:"activeSelected"}},{id:"8",className:{selected:"completedSelected"}},{id:"9",text:"completedCountMessage",className:{visible:"completedCount"},events:{click:["clearCompletedTodos"]}}]}return __extends(t,e),t.prototype.onInitialize=function(){e.prototype.onInitialize.call(this),this.todoAppBlock0.owner=this},t.prototype.onViewModelChanged=function(){e.prototype.onViewModelChanged.call(this),this.todoAppBlock0.setData({items:this.getValue("todos")})},t.prototype.onRenderElement=function(){var e=this,t=e._bindings;return e.element=e._ce("div",["class","approot"],null,[e._ce("section",["class","todoapp"],null,[e._ce("header",["class","header"],null,[e._ce("h1",[],null,[e._ct("todos")]),e._ce("form",["class","todo-form"],t[0],[e._ce("input",["class","new-todo","placeholder","What needs to be done?"],t[1])])]),e._ce("section",["class","main"],t[2],[e._ce("input",["class","toggle-all","type","checkbox"],t[3]),e._ce("label",["for","toggle-all"],null,[e._ct("Mark all as complete")]),e.todoAppBlock0.renderElement()]),e._ce("footer",["class","footer"],t[4],[e._ce("span",["class","todo-count"],t[5]),e._ce("ul",["class","filters"],null,[e._ce("li",[],null,[e._ce("a",["href","#/"],t[6],[e._ct("All")])]),e._ce("li",[],null,[e._ce("a",["href","#/active"],t[7],[e._ct("Active")])]),e._ce("li",[],null,[e._ce("a",["href","#/completed"],t[8],[e._ct("Completed")])])]),e._ce("button",["class","clear-completed"],t[9])])]),e._ce("footer",["class","info"],null,[e._ce("p",[],null,[e._ct("Double-click to edit a todo")]),e._ce("p",[],null,[e._ct("Credits:\r\n        "),e._ce("a",["href","http://github.com/dzearing"],null,[e._ct("David Zearing")])]),e._ce("p",[],null,[e._ct("Part of "),e._ce("a",["href","http://todomvc.com"],null,[e._ct("TodoMVC")])])])])},t}(l);return a});