require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
/**
    1. 公共属性:
    value,data-target,style,className,id

    2. onChange事件默认返回格式:
    e,data-target,value

    3. getValue返回value值

    4. TextArea\TextInput\PasswordInput 共用属性
    placeholder
    
    5.RadioGroup\SelectGroup 共用属性
    data
    
**/

var FormUtils = {
    getEventData: function getEventData(e) {
        e = e || event;
        var target = e.target || e.srcElement;
        var value = target.type == "checkbox" ? target.checked : target.value;
        var dataTarget = $(target).attr("data-target");
        return {
            event: e,
            value: value,
            target: dataTarget
        };
    },
    getRgcEventData: function getRgcEventData(e) {
        e = e || event;
        var target = e.target || e.srcElement;
        var value = $(target).attr("data-value");
        var dataTarget = $(target).attr("data-target");
        return {
            event: e,
            value: value,
            target: dataTarget
        };
    }
};

var TextArea = React.createClass({
    displayName: 'TextArea',

    _onChange: function _onChange(e) {
        var data = FormUtils.getEventData(e);

        var max = parseInt(this.props.max ? this.props.max : 0);
        var value = "";
        if (max > 0) value = data.value.substr(0, max);else value = data.value;

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    focus: function focus() {
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render: function render() {
        var props = this.props;
        return React.createElement('textarea', { ref: 'root', rows: props.rows, id: props.id, 'data-target': props["data-target"], disabled: props.disabled,
            className: "textarea" + (props.className ? " " + props.className : ""), placeholder: props.placeholder, style: props.style,
            onDragOver: props.onDragOver, onDrop: props.onDrop, value: props.value, onChange: this._onChange });
    }
});

var TextInput = React.createClass({
    displayName: 'TextInput',

    _onChange: function _onChange(e) {
        var data = FormUtils.getEventData(e);

        var max = parseInt(this.props.max ? this.props.max : 0);
        var value = "";
        if (max > 0) value = data.value.substr(0, max);else value = data.value;

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    focus: function focus() {
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render: function render() {
        var props = this.props;
        return React.createElement('input', { ref: 'root', type: 'text', className: "text-input" + (props.className ? " " + props.className : ""), disabled: props.disabled,
            'data-target': props["data-target"], id: props.id, placeholder: props.placeholder, onClick: props.onClick,
            style: props.style, value: props.value, onChange: this._onChange });
    }
});

var PasswordInput = React.createClass({
    displayName: 'PasswordInput',

    _onChange: function _onChange(e) {
        var data = FormUtils.getEventData(e);

        var max = parseInt(this.props.max ? this.props.max : 0);
        var value = "";
        if (max > 0) value = data.value.substr(0, max);else value = data.value;

        data.value = data.value.replace(/\s/gm, "");

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    _onKeyDown: function _onKeyDown(e) {
        e = e || event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            if (this.props.onEnterKeyDown) {
                this.props.onEnterKeyDown(e);
            }
            return false;
        }
    },
    val: function val() {
        return this.props.value;
    },
    focus: function focus() {
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render: function render() {
        var props = this.props;
        return React.createElement('input', { ref: 'root', type: 'password', className: "password-input" + (props.className ? " " + props.className : ""),
            'data-target': props["data-target"], id: props.id, placeholder: props.placeholder, disabled: props.disabled, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp,
            style: props.style, value: props.value, onChange: this._onChange });
    }
});

var SelectGroup = React.createClass({
    displayName: 'SelectGroup',

    _handleChange: function _handleChange(e) {
        var data = FormUtils.getEventData(e);

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    focus: function focus() {
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render: function render() {
        var props = this.props;
        var handleChange = this._handleChange;
        return React.createElement(
            'select',
            { ref: 'root', id: props.id, 'data-target': props["data-target"],
                value: props.value, style: props.style, onChange: handleChange,
                className: "select-group" + (props.className ? " " + props.className : "") },
            React.createElement(
                'option',
                { value: '' },
                '--请选择--'
            ),
            props.data.map(function (ele, pos) {
                return React.createElement(
                    'option',
                    { key: ele.value, value: ele.value },
                    ele.text
                );
            })
        );
    }
});

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',

    _handleClick: function _handleClick(e) {
        var data = FormUtils.getEventData(e);

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    render: function render() {
        var props = this.props;
        var handleClick = this._handleClick;
        return React.createElement(
            'div',
            { className: 'radio-group', id: props.id },
            props.data.map(function (ele, pos) {
                var checked = props.value == ele.value;
                return React.createElement(
                    'div',
                    { key: ele.value, className: 'select-option' },
                    React.createElement('input', { key: ele.value, 'data-target': props["data-target"], type: 'radio', name: props.name, checked: checked,
                        value: ele.value, style: props.style, onChange: handleClick }),
                    React.createElement('span', { dangerouslySetInnerHTML: { __html: ele.text } })
                );
            })
        );
    }
});
var RadioGroupClick = React.createClass({
    displayName: 'RadioGroupClick',

    _handleClick: function _handleClick(e) {
        var data = FormUtils.getRgcEventData(e);

        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    render: function render() {
        var props = this.props;
        var handleClick = this._handleClick;
        return React.createElement(
            'div',
            { className: 'radio-group', id: props.id },
            props.data.map(function (ele, pos) {
                var _className = props.value == ele.value ? " active" : "";
                return React.createElement(
                    'div',
                    { key: ele.value, className: 'select-option' },
                    React.createElement('div', { key: ele.value, 'data-target': props["data-target"], name: props.name,
                        'data-value': ele.value, style: props.style, className: "check-radio" + _className, onClick: handleClick, dangerouslySetInnerHTML: { __html: ele.text } })
                );
            })
        );
    }
});

var FormGroup = React.createClass({
    displayName: 'FormGroup',

    render: function render() {
        var props = this.props;
        return React.createElement(
            'div',
            { className: 'form-group', style: props.style },
            React.createElement(
                'label',
                { htmlFor: props.htmlFor, className: 'col-xs-2 control-label' },
                props.title
            ),
            React.createElement(
                'div',
                { className: 'col-xs-10' },
                props.children
            )
        );
    }
});

var CheckBox = React.createClass({
    displayName: 'CheckBox',

    _onChange: function _onChange(e) {
        var data = FormUtils.getEventData(e);
        data.value = data.value == true || data.value == "true";
        if (this.props.onChange) {
            this.props.onChange(data.event, data.target, data.value);
        }
    },
    val: function val() {
        return this.props.value;
    },
    focus: function focus() {
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render: function render() {
        var props = this.props;
        var checked = props.value == true || props.value == "true";
        return React.createElement(
            'div',
            { className: "checkbox" + (props.className ? " " + props.className : "") },
            React.createElement('input', { ref: 'root', type: 'checkbox', className: 'checkbox-input',
                'data-target': props["data-target"], id: props.id, disabled: props.disabled,
                style: props.style, checked: checked, value: checked, onChange: this._onChange }),
            React.createElement('span', { dangerouslySetInnerHTML: { __html: props.text } })
        );
    }
});

module.exports = {
    TextArea: TextArea,
    TextInput: TextInput,
    SelectGroup: SelectGroup,
    RadioGroup: RadioGroup,
    PasswordInput: PasswordInput,
    FormGroup: FormGroup,
    CheckBox: CheckBox,
    RadioGroupClick: RadioGroupClick
};

},{"react":undefined,"react-dom":undefined}],2:[function(require,module,exports){
"use strict";

var React = require('react');
var RouteHistory = {
    hashTable: [],
    curHash: { state: {}, hash: "/" },
    pushHash: function pushHash(hash, state) {
        this.hashTable.push(this.curHash);
        this.curHash = {
            hash: hash,
            state: state
        };
        location.hash = hash;
    }
};
var RouterUtils = {
    createRoute: function createRoute(element, parentProps) {
        var location = parentProps.location + "/" + element.props.path,
            components = parentProps.components.concat([element.props.component]);
        return {
            location: location,
            components: components
        };
    },
    createRoutesByPropsChildren: function createRoutesByPropsChildren(children, parentProps) {
        var routes = new Array();
        for (var i = 0; i < children.length; i++) {
            var element = children[i];
            var route = this.createRoute(element, parentProps);

            if (element.props.children instanceof Array) {
                route.routes = this.createRoutesByPropsChildren(element.props.children, route);
            } else if (element.props.children instanceof Object) {
                route.routes = this.createRoutesByPropsChildren([element.props.children], route);
            }
            delete element.props.children;
            routes.push(route);
        }

        return routes;
    },
    createRoutes: function createRoutes(parentProps) {
        var parentRoute = {
            components: [parentProps.component],
            location: ""
        };
        parentRoute.routes = this.createRoutesByPropsChildren(parentProps.children, parentRoute);
        delete parentProps.children;
        return parentRoute;
    }
};

var Router = React.createClass({
    displayName: "Router",

    getInitialState: function getInitialState() {
        return {
            location: this.props.defaultRoute ? this.props.defaultRoute : "/",
            routes: null,
            components: null
        };
    },
    componentWillMount: function componentWillMount() {
        if (location.hash != this.state.location) {
            RouteHistory.pushHash(this.state.location);
        }
        var routes = RouterUtils.createRoutes(this.props);
        var components = this._parseHash(routes, this.state.location);
        this.setState({
            routes: routes,
            components: components
        });
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener("hashchange", this._handleHashChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener("hashchange", this._handleHashChange);
    },
    _matchLocation: function _matchLocation(_location, hash) {
        var locations = _location.split("/");
        var hashs = hash.split("/");
        var props = { location: hash };
        if (locations.length == hashs.length) {
            var results = locations.filter(function (ele, pos) {
                var _hash = hashs[pos];
                if (_hash.indexOf("?") != -1) {
                    var _hashs = _hash.split("?");
                    hashs[pos] = _hashs[0];
                    eles = _hashs[1].split("&");
                    for (var i = 0; i < eles.length; i++) {
                        var objs = eles[i].split("=");
                        props[objs[0]] = objs[1];
                    }
                }
                if (ele.indexOf(":") != -1) {
                    props[ele.split(":")[1]] = hashs[pos];
                    return true;
                } else {
                    return ele == hashs[pos];
                }
            });
            return results.length == locations.length ? props : null;
        }
        return null;
    },
    _parseHashByRoutes: function _parseHashByRoutes(routes, hash) {
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var props = this._matchLocation(route.location, hash);
            if (props) {
                route.props = props;
                return route;
            }
            if (route.routes) {
                var result = this._parseHashByRoutes(route.routes, hash);
                if (result != null) return result;
            }
        }
        return null;
    },
    _parseHash: function _parseHash(routes, hash) {
        var route = this._parseHashByRoutes(routes.routes, hash);
        if (route == null) return React.createElement("div", null, "404");
        return this._createElementByComponents(route.components, route.props);
    },
    _createElementByComponent: function _createElementByComponent(component, components, props) {
        if (components.length > 1) {
            var _components = components.filter(function (ele, pos) {
                return pos > 0;
            });
            var child = this._createElementByComponent(_components[0], _components, props);
            return React.createElement(component, props, child);
        } else {
            return React.createElement(component, props, null);
        }
    },
    _createElementByComponents: function _createElementByComponents(components, props) {
        return this._createElementByComponent(components[0], components, props);
    },
    _handleHashChange: function _handleHashChange() {
        var hash = location.hash.replace("#", "");
        var components = this._parseHash(this.state.routes, hash);
        this.setState({
            location: hash,
            components: components
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "react-router" + (this.props.className ? " " + this.props.className : "") },
            this.state.components
        );
    }
});
var Route = React.createClass({
    displayName: "Route",

    render: function render() {
        return React.createElement("div", null);
    }
});
var Link = React.createClass({
    displayName: "Link",

    handleClick: function handleClick(e) {
        var to = this.props.to;
        RouteHistory.pushHash(to);
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    },
    render: function render() {
        var props = this.props;
        if (props.anchor) {
            return React.createElement(
                "a",
                { key: props.key, "data-status": props["data-status"], "data-target": props["data-target"], title: props.title, className: "link" + (props.className ? " " + props.className : "") + (props.active ? " active" : ""), onClick: this.handleClick, style: props.style },
                props.children
            );
        } else {
            return React.createElement(
                "div",
                { key: props.key, "data-status": props["data-status"], "data-target": props["data-target"], title: props.title, className: "link" + (props.className ? " " + props.className : "") + (props.active ? " active" : ""), onClick: this.handleClick, style: props.style },
                props.children
            );
        }
    }
});

module.exports.Router = Router;
module.exports.Route = Route;
module.exports.Link = Link;
module.exports.History = RouteHistory;

},{"react":undefined}],"react-components-common":[function(require,module,exports){
'use strict';

module.exports = {
	form: require('./ReactForm.react'),
	router: require('./ReactRouter')
};

},{"./ReactForm.react":1,"./ReactRouter":2}]},{},[]);
