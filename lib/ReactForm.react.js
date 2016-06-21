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