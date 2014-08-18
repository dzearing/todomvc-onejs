define(["require", "exports", 'ViewModel', 'EventGroup', 'Encode', 'DomUtils'], function(require, exports, ViewModel, EventGroup, Encode, DomUtils) {
    var ViewState;
    (function (ViewState) {
        ViewState[ViewState["CREATED"] = 0] = "CREATED";
        ViewState[ViewState["INACTIVE"] = 1] = "INACTIVE";
        ViewState[ViewState["ACTIVE"] = 2] = "ACTIVE";
        ViewState[ViewState["DISPOSED"] = 3] = "DISPOSED";
    })(ViewState || (ViewState = {}));

    var View = (function () {
        function View(viewModel) {
            this.viewName = 'View';
            this.viewModelType = ViewModel;
            this._bindings = [];
            this._lastValues = {};
            this._state = 0 /* CREATED */;
            this.loadStyles = DomUtils.loadStyles;
            this.events = new EventGroup(this);
            this.activeEvents = new EventGroup(this);
            this.children = [];
            this._inheritedModel = viewModel;
        }
        View.prototype.dispose = function () {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].dispose();
            }

            if (this._state !== 3 /* DISPOSED */) {
                if (this._state == 2 /* ACTIVE */) {
                    this.deactivate();
                }

                this._state = 3 /* DISPOSED */;

                this.clearChildren();
                this.events.dispose();
                this.activeEvents.dispose();

                if (!this._inheritedModel) {
                    this._viewModel.dispose();
                }
            }
        };

        View.prototype.onInitialize = function () {
        };
        View.prototype.onRenderHtml = function (viewModel) {
            return '';
        };
        View.prototype.onResize = function () {
        };
        View.prototype.onActivate = function () {
        };
        View.prototype.onDeactivate = function () {
        };
        View.prototype.onViewModelChanged = function (changeArgs) {
        };

        View.prototype.setData = function (data, forceUpdate) {
            if (this._state !== 3 /* DISPOSED */) {
                this.initialize();
                this._viewModel.setData(data, forceUpdate);
            }
        };

        View.prototype.initialize = function () {
            if (this._state === 0 /* CREATED */) {
                this._state = 1 /* INACTIVE */;

                this.id = this.viewName + '-' + (View._instanceCount++);

                this._viewModel = this._inheritedModel ? this._inheritedModel : new this.viewModelType();
                this.events.on(this._viewModel, 'change', this.evaluateView);
                this._viewModel.initialize();
                this.onViewModelChanged();
                this.onInitialize();

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].initialize();
                }
            }
        };

        View.prototype.renderHtml = function () {
            var html;

            if (this._state !== 3 /* DISPOSED */) {
                this.initialize();

                html = this.onRenderHtml(this._viewModel);
            }

            return html;
        };

        View.prototype.activate = function () {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].activate();
            }

            if (this._state === 1 /* INACTIVE */) {
                this._state = 2 /* ACTIVE */;

                this._bindEvents();
                this._findElements();
                this.updateView(true);

                this.onActivate();
            }
        };

        View.prototype.resize = function () {
            if (this._state === 2 /* ACTIVE */) {
                this.onResize();

                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].resize();
                }
            }
        };

        View.prototype.deactivate = function () {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].deactivate();
            }

            if (this._state === 2 /* ACTIVE */) {
                this._state = 1 /* INACTIVE */;

                this.onDeactivate();

                this._subElements = null;
                this.activeEvents.off();
            }
        };

        View.prototype.addChild = function (view, owner) {
            view.parent = this;
            view.owner = owner;

            this.children.push(view);

            return view;
        };

        View.prototype.removeChild = function (view) {
            var childIndex = this.children.indexOf(view);
            var child = this.children[childIndex];

            if (childIndex > -1) {
                this.children.splice(childIndex, 1)[0].parent = null;
            }

            return view;
        };

        View.prototype.clearChildren = function () {
            while (this.children.length > 0) {
                this.removeChild(this.children[0]);
            }
        };

        View.prototype.evaluateView = function (changeArgs) {
            this.onViewModelChanged(changeArgs);
            this.updateView();
        };

        View.prototype.updateView = function (updateValuesOnly) {
            if (this._state === 2 /* ACTIVE */) {
                for (var i = 0; this._bindings && i < this._bindings.length; i++) {
                    var binding = this._bindings[i];

                    for (var bindingType in binding) {
                        if (bindingType != 'id' && bindingType != 'events' && bindingType != 'childId') {
                            if (bindingType === 'text' || bindingType === 'html') {
                                this._updateViewValue(binding, bindingType, binding[bindingType], updateValuesOnly);
                            } else {
                                for (var bindingDest in binding[bindingType]) {
                                    this._updateViewValue(binding, bindingType, binding[bindingType][bindingDest], updateValuesOnly, bindingDest);
                                }
                            }
                        }
                    }
                }
            }
        };

        View.prototype._updateViewValue = function (binding, bindingType, sourcePropertyName, updateValuesOnly, bindingDest) {
            var key = binding.id + bindingType + (bindingDest ? ('.' + bindingDest) : '');
            var lastValue = this._lastValues[key];
            var currentValue = this.getValue(sourcePropertyName);

            if (lastValue != currentValue) {
                this._lastValues[key] = currentValue;

                // TODO: enqueue for renderframe update.
                if (!updateValuesOnly) {
                    console.log(this.viewName + ' updateView' + this.id);

                    var el = this._subElements[binding.id];

                    console.log('Updating "' + binding.id + '" because "' + sourcePropertyName + '" changed to "' + currentValue + '"');

                    switch (bindingType) {
                        case 'text':
                            el.textContent = currentValue;
                            break;

                        case 'html':
                            el.innerHTML = currentValue;
                            break;

                        case 'className':
                            DomUtils.toggleClass(el, bindingDest, currentValue);
                            break;

                        case 'attr':
                            if (bindingDest === "value" || bindingDest === 'checked') {
                                el[bindingDest] = currentValue;
                            } else if (currentValue) {
                                el.setAttribute(bindingDest, currentValue);
                            } else {
                                el.removeAttribute(bindingDest);
                            }
                            break;
                    }
                }
            }
        };

        View.prototype.getViewModel = function () {
            return this._viewModel;
        };

        View.prototype.getValue = function (propertyName) {
            var targetObject = this._getPropTarget(propertyName);

            propertyName = this._getPropName(propertyName);

            var targetValue = (targetObject && targetObject.target) ? targetObject.target[propertyName] : '';

            if (typeof targetValue === 'function') {
                targetValue = targetValue.call(targetObject.target, this._viewModel, propertyName);
            }

            return targetValue;
        };

        View.prototype.setValue = function (propertyName, propertyValue) {
            var targetObject = this._getPropTarget(propertyName);
            var targetViewModel = targetObject.viewModel;

            // TODO, this is a temp fix, less than ideal. If we set command.isExpanded
            // as the property name, we'd have to do what we have below which is to reach
            // in and set the value on the the target. We shouldn't do this.
            // But viewmodel.setData is shallow, so if we passed in { command: { isExpanded: true }},
            // it would stomp on the existing value as it's a new command object.
            if (targetViewModel && typeof targetObject.target[targetObject.propertyName] !== 'function') {
                targetObject.target[targetObject.propertyName] = propertyValue;
                targetViewModel.change();
            }
        };

        View.prototype._getPropName = function (propertyName) {
            var periodIndex = propertyName.lastIndexOf('.');

            if (periodIndex > -1) {
                propertyName = propertyName.substr(periodIndex + 1);
            }

            return propertyName;
        };

        View.prototype._getPropTarget = function (propertyName) {
            var view = this;
            var viewModel = view.getViewModel();
            var propTarget = viewModel;
            var periodIndex = propertyName.indexOf('.');
            var propertyPart;

            while (periodIndex > -1 && propTarget) {
                propertyPart = propertyName.substr(0, periodIndex);

                if (propertyPart === '$parent') {
                    view = this.parent.owner || this.parent;
                    propTarget = view ? view.getViewModel() : null;
                } else if (propertyPart === '$root') {
                    view = this._getRoot();
                    propTarget = view.getViewModel();
                } else {
                    propTarget = propTarget[propertyPart];
                }

                if (propTarget.isViewModel) {
                    viewModel = propTarget;
                }

                propertyName = propertyName.substr(periodIndex + 1);
                periodIndex = propertyName.indexOf('.');
            }

            return {
                originView: this,
                view: view,
                viewModel: viewModel,
                target: propTarget,
                propertyName: propertyName
            };
        };

        View.prototype._getRoot = function () {
            var root = this;

            while (root.parent) {
                root = root.parent;
            }

            return root;
        };

        View.prototype._genStyle = function (defaultStyles, styleMap) {
            defaultStyles = defaultStyles || '';

            var styles = defaultStyles.split(';');
            var viewModel = this._viewModel;

            for (var i = 0; styleMap && i < styleMap.length; i += 2) {
                var styleRule = styleMap[i];
                var source = styleMap[i + 1];

                switch (styleRule) {
                    case 'display':
                    case 'display.inline-block':
                        styles.push('display: ' + (this.getValue(source) ? ((styleRule.indexOf('.') > -1) ? styleRule.split('.').pop() : 'block') : 'none'));
                        break;

                    default:
                        if (styleMap[i + 1]) {
                            styles.push(styleMap[i] + ': ' + Encode.toHtmlAttr(this.getValue(styleMap[i + 1])));
                        }
                        break;
                }
            }

            return 'style="' + styles.join('; ') + '"';
        };

        View.prototype._genClass = function (defaultClasses, classMap) {
            defaultClasses = defaultClasses || '';

            var classes = defaultClasses ? defaultClasses.split(' ') : [];

            for (var i = 0; classMap && i < classMap.length; i += 2) {
                if (this.getValue(classMap[i + 1])) {
                    classes.push(classMap[i]);
                }
            }

            return classes.length ? ('class="' + classes.join(' ') + '"') : '';
        };

        View.prototype._genAttr = function (defaultAttributes, attributeMap) {
            var attrString = '';
            var attributes = [];

            for (var i = 0; i < attributeMap.length; i += 2) {
                var val = this.getValue(attributeMap[i + 1]);
                if (val) {
                    attributes.push(attributeMap[i] + '="' + Encode.toHtmlAttr(val) + '"');
                }
            }

            return attributes.join(' ');
        };

        View.prototype._genText = function (propertyName) {
            return Encode.toJS(this.getValue(propertyName));
        };

        View.prototype._genHtml = function (propertyName) {
            return Encode.toHtml(this.getValue(propertyName));
        };

        View.prototype._bindEvents = function () {
            var _this = this;

            for (var i = 0; i < this._bindings.length; i++) {
                var binding = this._bindings[i];
                var targetElement = document.getElementById(this.id + '_' + binding.id);

                for (var bindingType in binding) {
                    if (bindingType != 'id' && bindingType != 'events') {
                        for (var bindingDest in binding[bindingType]) {
                            var source = binding[bindingType][bindingDest];
                            if (source.indexOf('$parent') > -1) {
                                this._viewModel.setData({
                                    '$parent': (this.owner || this.parent).getViewModel()
                                }, false);
                            }
                            if (source.indexOf('$root') > -1) {
                                this._viewModel.setData({
                                    '$root': this._getRoot().getViewModel()
                                }, false);
                            }
                        }
                    }
                }

                if (binding.events) {
                    for (var eventName in binding.events) {
                        var targetList = binding.events[eventName];

                        this._bindEvent(targetElement, eventName, targetList);
                    }
                }

                this._bindInputEvent(targetElement, binding);
            }
        };
        View.prototype._bindInputEvent = function (element, binding) {
            if (binding.attr && (binding.attr.value || binding.attr.checked)) {
                this.activeEvents.on(element, 'input,change', function () {
                    var source = binding.attr.value ? 'value' : 'checked';
                    var newValue = element[source];
                    var key = binding.id + 'attr.' + source;

                    this._lastValues[key] = newValue;
                    this.setValue(binding.attr[source], newValue);
                });
            }
        };

        View.prototype._bindEvent = function (element, eventName, targetList) {
            var _this = this;

            this.activeEvents.on(element, eventName, function (ev) {
                for (var targetIndex = 0; targetIndex < targetList.length; targetIndex++) {
                    var target = targetList[targetIndex];
                    var args = arguments;

                    var paramsPosition = target.indexOf('(');

                    if (paramsPosition > -1) {
                        var providedArgs = target.substr(paramsPosition + 1, target.length - paramsPosition - 2).split(/[\s,]+/);

                        args = [];
                        for (var i = 0; i < providedArgs.length; i++) {
                            args.push(this.getValue(providedArgs[i]));
                        }
                        target = target.substr(0, paramsPosition);
                    }

                    //if (target[0] == '$') {
                    //    return _this._callUtility(element, eventName, target.substr(1));
                    //} else {
                    var propTarget = _this._getPropTarget(target);
                    var parentObject = propTarget.target;
                    var propertyName = propTarget.propertyName;

                    if (parentObject && parentObject[propertyName]) {
                        return parentObject[propertyName].apply(parentObject, args);
                    }
                    //}
                }
            });
        };

        View.prototype._callUtility = function (element, eventName, util) {
            var _this = this;
            var paramIndex = util.indexOf('(');
            var utilName = util.substr(0, paramIndex);
            var params = util.substr(paramIndex + 1, util.length - paramIndex - 2).split(/[\s,]+/);
            var method = _this['_' + utilName];

            if (method) {
                return method.apply(this, params);
            }
        };

        View.prototype._toggle = function (propertyName) {
            this.setValue(propertyName, !this.getValue(propertyName));

            return false;
        };

        View.prototype._send = function (sourcePropertyName, destinationPropertyName) {
            this.setValue(destinationPropertyName, this.getValue(sourcePropertyName));
        };

        View.prototype._findElements = function () {
            this._subElements = {};

            for (var i = 0; i < this._bindings.length; i++) {
                var binding = this._bindings[i];
                var element = document.getElementById(this.id + '_' + binding.id);

                this._subElements[binding.id] = element;
                if (binding.childId) {
                    this._subElements[binding.childId] = element;
                }
            }
        };
        View._instanceCount = 0;
        return View;
    })();

    
    return View;
});