var React = require('react');
var ReactDOM = require('react-dom');
var components = require('react-components-common');
var router = components.router;
var form = components.form;
var TextInput = form.TextInput;

var FormPanel = React.createClass({
	getInitialState:function(){
		return {
			form_data:{}
		}
	},
	getFormData:function(){
		return this.state.form_data;
	},
	handleChange:function(e,target,value){
		e = e || event;
		var form_data = this.state.form_data;
		form_data[target] = value;
		this.setState({
			form_data:form_data
		})
		if(this.props.onFormChange){
			this.props.onFormChange(form_data);
		}
	},
	render:function(){
		var form_data = this.state.form_data;
		return (<TextInput value={form_data.value} data-target="value" onChange={this.handleChange} style={{"marginBottom":"10px"}} />)
	}
})

var App = React.createClass({
	handleFormChange:function(form_data){
		console.log(form_data);
	},
	render:function(){
		return (<div>
				<FormPanel onFormChange={this.handleFormChange}/>
			   </div>)
	}
})
	
ReactDOM.render(<App />, document.getElementById('react-container'));