import React, { Component } from 'react';

class ListInput extends Component {
  constructor() {
    super();
    this.state = {
    	initialValue: ''
    }
  }

	handleChange = (index) => {
		return (e) => {
			let list = this.props.value || [];
			if (index != null){
				list[index] = e.target.value;
				this.props.onChange(list, this.props.valueName);
			}
			else {
				this.setState({ initialValue: e.target.value });
			}
		}
	}

	handleAdd = (val) => {
		let list = this.props.value || [];
		list.push(val);
		this.props.onChange(list, this.props.valueName);

		this.setState({ initialValue: '' });
	}

	handleDelete = (index) => {
		let list = this.props.value || [];
		list.splice(index, 1);
		this.props.onChange(list, this.props.valueName);
	}

	handleDone = (val) => {
		if (val){
			let list = this.props.value || [];
			list.push(val);
			this.props.onChange(list, this.props.valueName);
		}
		this.setState({ doneAdding: !this.state.doneAdding });
		this.setState({ initialValue: '' });
	}

	renderEmptyInput = () => {
		let props = this.props;
		return (
			<div className="list-input-group">
		  	<input
		      className="form-control list-input"
		      type={ props.type }
		      name={ props.name }
		      placeholder={ props.placeholder }
		      value={ this.state.initialValue }
		      onChange={ this.handleChange() }
		    />
		    <button className="btn btn-default" type="button" onClick={ () => this.handleDone(this.state.initialValue) }>Done</button>
		    <button className="btn btn-default" type="button" onClick={ () => this.handleAdd(this.state.initialValue) }>Add</button>
		   </div>
	  );
	}

	render () {

		let props = this.props;

		if (!props.value || !props.value.length){
			return this.renderEmptyInput();
		}

	  return (
	  	<div className="list-input-container">
		  	{ props.value.map((val, i) => 
			  		<div className="list-input-group" key={ i }>
				  		<input
					      className="form-control list-input"
					      type={ props.type }
					      name={ props.name }
					      placeholder={ props.placeholder }
					      value={ val }
					      onChange={ this.handleChange(i) }
					    />
					    { !this.state.doneAdding && <button className="btn btn-default" type="button" onClick={ () => this.handleDelete(i) }>Delete</button> }
					  </div>
			  	)
		  	}
		  	{ 
		  		this.state.doneAdding ? 
		  		<button className="btn btn-default" type="button" onClick={ () => this.handleDone() }>Add Another</button>
		  		: 
		  		this.renderEmptyInput() 
		  	}
			</div>
	  )
	 }
}

export { ListInput };