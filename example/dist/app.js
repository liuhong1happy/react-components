require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var components = require('react-components-common');
var router = components.router;
var form = components.form;
var TextInput = form.TextInput;

var FormPanel = React.createClass({
	displayName: 'FormPanel',

	getInitialState: function getInitialState() {
		return {
			form_data: {}
		};
	},
	getFormData: function getFormData() {
		return this.state.form_data;
	},
	handleChange: function handleChange(e, target, value) {
		e = e || event;
		var form_data = this.state.form_data;
		form_data[target] = value;
		this.setState({
			form_data: form_data
		});
		if (this.props.onFormChange) {
			this.props.onFormChange(form_data);
		}
	},
	render: function render() {
		var form_data = this.state.form_data;
		return React.createElement(TextInput, { value: form_data.value, 'data-target': 'value', onChange: this.handleChange, style: { "marginBottom": "10px" } });
	}
});

var App = React.createClass({
	displayName: 'App',

	handleFormChange: function handleFormChange(form_data) {
		console.log(form_data);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(FormPanel, { onFormChange: this.handleFormChange })
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('react-container'));

},{"react":undefined,"react-components-common":undefined,"react-dom":undefined}]},{},[1]);
