var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'ViewModel'], function(require, exports, ViewModel) {
    var TodoModel = (function (_super) {
        __extends(TodoModel, _super);
        function TodoModel(todo) {
            _super.call(this);
            this.isCompleted = false;
            this.isEditing = false;
            this.title = todo;
        }
        TodoModel.prototype.edit = function () {
            this.isEditing = true;
            this._tempTitle = this.title;
            this.change();

            return false;
        };

        TodoModel.prototype.doneEditing = function () {
            this.isEditing = false;
            this.change();

            return false;
        };

        TodoModel.prototype.revertEdit = function () {
            this.title = this._tempTitle;
            this.isEditing = false;
            this.change();
        };
        return TodoModel;
    })(ViewModel);

    
    return TodoModel;
});
