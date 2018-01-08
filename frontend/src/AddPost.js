import React, { Component } from 'react';
import './App.css';
import serializeForm from 'form-serialize';


class AddPost extends Component {
	formSubmit = (e) => {
	    e.preventDefault();
	    const {addPost} = this.props;    
	    const values = serializeForm(e.target, { hash: true });
	    e.target.reset();
	    addPost(values);
	    const headers = {
	      'Accept': 'application/json',
	      'Authorization': 'whatever-you-want'
	    };
	    fetch(`http://localhost:3001/posts`, {
	    method: 'POST',
	    headers: {
	      ...headers,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(values)
	    }).then(res => res.json());
  	}

	render(){
		return (
			<div>
				<h4>Add Post:</h4>
	            <form  id="form-data" onSubmit={this.formSubmit}>
	             	<input type="hidden" name="id" value={Math.random().toString(36).substr(-10)}></input>
	                <input type="hidden" name="timestamp" value={Date.now()}></input>
	                <p>Author: </p>
	                <input name="author" type="text" required></input>
	                <p>Title: </p>
	                <input name="title" type="text" required></input>
	                <p>Category: </p>
	                <select name="category">
	                	<option value="react">React</option>
	                    <option value="redux">Redux</option>
	                    <option value="udacity">Udacity</option>
	              	</select>
	                <p>Body:</p>
	                <textarea name="body" className="form-control" rows="3" required></textarea>
	                <button type="submit" className="btn btn-success">Submit</button>
	            </form>
			</div>
			);
	}
	
}

export default AddPost