var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'View', 'List'], function(require, exports, View, List) {
    /// <summary>
    /// The Repeater view renders a given child view (provided by the overridable getChildControlType function) for
    /// each item in an array. It keeps the DOM updated as the array changes. Each item in
    /// the array needs to contain objects that each have a 'key' property.
    // If there is no key on an item, a unique one will be created so that the item can be uniquely identified.
    /// </summary>
    var Repeater = (function (_super) {
        __extends(Repeater, _super);
        function Repeater() {
            _super.apply(this, arguments);
            this.viewName = 'Repeater';
            this.collectionName = 'items';
            this.itemName = 'item';
            this.indexName = 'index';
            this.childViewType = View;
            this.currentList = new List();
            this._surfaceRoots = [];
            this._bindings = [
                {
                    "id": "0",
                    "childId": "surface"
                }
            ];
        }
        Repeater.prototype.onRenderElement = function () {
            return (this.element = this._ce('div', [], null, this.getChildElements()));
        };

        Repeater.prototype.getChildElements = function () {
            var items = this.getValue(this.collectionName);
            var childElements = [];

            if (!items || !items.isList) {
                items = new List(items);
            }

            this.clearChildren();

            for (var i = 0; items && i < items.getCount(); i++) {
                childElements.push(this._createChild(items.getAt(i), i).renderElement());
            }

            return childElements;
        };

        Repeater.prototype.onViewModelChanged = function (changeArgs) {
            // evaluate new set of items
            if (this._state === 2 && changeArgs) {
                var surfaceElement = this.subElements.surface;

                switch (changeArgs.type) {
                    case 'insert':
                        var div = document.createElement('div');
                        var frag = document.createDocumentFragment();
                        var child = this._createChild(changeArgs.item, changeArgs.index);
                        var elementAtPosition = surfaceElement.childNodes[changeArgs.index];
                        var childElement = child.renderElement();

                        if (elementAtPosition) {
                            surfaceElement.insertBefore(childElement, elementAtPosition);
                        } else {
                            surfaceElement.appendChild(childElement);
                        }

                        child.activate();
                        break;

                    case 'remove':
                        var element = surfaceElement.childNodes[changeArgs.index];

                        element['control'].dispose();
                        surfaceElement.removeChild(element);
                        break;
                }
            }
        };

        Repeater.prototype._createChild = function (item, index) {
            var newChild = this.addChild(new this.childViewType(), this.owner);
            var childData;

            childData = {};

            // childData[this.collectionName] = items;
            childData[this.itemName] = item;
            childData[this.indexName] = index;

            newChild.setData(childData);

            return newChild;
        };
        return Repeater;
    })(View);

    
    return Repeater;
});
