import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import serializeForm from 'form-serialize';

class SinglePost extends Component {

	state = {
		isEdit: false,
	}

	editTrue = ()=> {
    	this.setState({isEdit:true});
  	}

  	editFalse = ()=> {
    	this.setState({isEdit:false});
  	}

  	changePost = (e)=>{
  		this.setState({isEdit:false});
	    e.preventDefault();
	    const {editPost} = this.props;
	    const values = serializeForm(e.target, { hash: true });
	    editPost(values);
	    const headers = {
	      'Accept': 'application/json',
	      'Authorization': 'whatever-you-want'
	    };
	    fetch(`http://localhost:3001/posts/${values.id}`, {
	    method: 'PUT',
	    headers: {
	      ...headers,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(values)
	    }).then(res => res.json());
  	}

	render(){
		const {post, id, votePost, removePost} = this.props;
		const {isEdit} = this.state;
		return(<div>
				<h4><small>POST</small></h4>
                    <hr/>
                    {post ? <ul name="Ul">
                      {post.filter((post)=> post.id === id).map(({id,timestamp,author,body,title,category,voteScore,commentCount},index)=>{
                      	const date = new Date(parseInt(timestamp,10));
                        return <li key={id} value={id}>
                          <a><h2>{title}</h2></a>
                          <h5><span className="glyphicon glyphicon-time"></span> Post by {author} at {date.toString()}</h5>
                          <h5><span className="glyphicon"></span> {commentCount} comments</h5>
                          <h5><span className="label label-success">{category}</span></h5><br/>
                          <p>{body}</p>
                          <p>{voteScore} likes     <button value="like" onClick={(e)=>{
                                const voteScore = e.target.value;
                                const values = {option:'upVote'}
                                votePost({id, voteScore});  //Updating the store using votePost action dispatcher

                                /*Updating the database*/
                                const headers = {
                                  'Accept': 'application/json',
                                  'Authorization': 'whatever-you-want'
                                }
                                fetch(`http://localhost:3001/posts/${id}`, {
                                  method: 'POST',
                                  headers: {
                                    ...headers,
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(values)
                                  }).then(res => res.json())
                            }}>Like</button>
                            <button value="disLike" onClick={(e)=>{
                                const voteScore = e.target.value;
                                votePost({id, voteScore});  //Updating the store using the votePost action dispatcher

                                /*Updating the database*/
                                const values = {option:'downVote'}
                                const headers = {
                                  'Accept': 'application/json',
                                  'Authorization': 'whatever-you-want'
                                }
                                fetch(`http://localhost:3001/posts/${id}`, {
                                  method: 'POST',
                                  headers: {
                                    ...headers,
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(values)
                                  }).then(res => res.json())
                            }}>Dislike</button></p>
                          	<Link to={`/`}><button value={id} onClick={(e)=>{
                            const id = e.target.value;
                            /*Updating the database*/
                            const headers = {
                              'Accept': 'application/json',
                              'Authorization': 'whatever-you-want'
                            };
                            fetch(`http://localhost:3001/posts/${id}`, {
                              method: 'DELETE',
                              headers: {
                                ...headers,
                                'Content-Type': 'application/json'
                              },
                            }).then(res => console.log(res.json()));

                              removePost({id});  //Updating the store using the removePost action dispatcher
                            }}>Delete</button></Link>

                          <button onClick={this.editTrue}>Edit</button>
                           <hr/>
                           {isEdit && <form  id="form-data" onSubmit={this.changePost} >
                              <input type="hidden" name="id" value={id} ></input>
                              <p>Author: </p>
                              <input name="author" type="text"  defaultValue={author}></input>
                              <p>Title: </p>
                              <input name="title" type="text"  defaultValue={title}></input>
                              <p>Category: </p>
                                <select name="category" >
                                  <option value="react">React</option>
                                  <option value="redux">Redux</option>
                                  <option value="udacity">Udacity</option>
                                </select>
                              <p>Body:</p>
                              <textarea name="body" className="form-control" rows="3" required  defaultValue={body}></textarea>
                            <button type="submit" className="btn btn-success">Submit</button>
                          </form>}
                        </li>
                      })}
                    </ul> : <p>waiting</p>}
			</div>);
	}
}

export default SinglePost