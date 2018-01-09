import React, { Component } from 'react';
import './App.css';
import serializeForm from 'form-serialize';

class Comments extends Component {
	state={
		isComment: false,
		isCommentEdit:false,
	}

	isComment = ()=> {
	    this.setState({isComment:true});
	}

	commentEditTrue = ()=>{
	    this.setState({isCommentEdit:true});
  	}

  	commentEdit = (e)=> {
	    e.preventDefault();
	    this.setState({isCommentEdit:false});
	    const {editComment} = this.props;
	    const values = serializeForm(e.target, { hash: true });
	    editComment(values);  // Updating the store using editComment action dispatcher

      /* Updating the database */
	    const headers = {
	      'Accept': 'application/json',
	      'Authorization': 'whatever-you-want'
	    };
	    fetch(`http://localhost:3001/comments/${values.id}`, {
	    method: 'PUT',
	    headers: {
	      ...headers,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(values)
	    }).then(res => res.json());
  	}

  	commentSubmit = (e)=>{
	    e.preventDefault();
	    this.setState({isComment:false});
	    const values = serializeForm(e.target, { hash: true });
	    const headers = {
	      'Accept': 'application/json',
	      'Authorization': 'whatever-you-want'
	    };
	    const {addComment} = this.props;
	    addComment(values);  // Updating the store using addComment action dispatcher

      /* Updating the database */
	    fetch(`http://localhost:3001/comments`, {
	    method: 'POST',
	    headers: {
	      ...headers,
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(values)
	    }).then(res => res.json());
	}

	render() {
		const {comments, id, voteComment, removeComment} = this.props;
		const {isComment, isCommentEdit} = this.state;
		return(
			<div>
				<h4><small>COMMENTS:</small></h4>
                    <button onClick={this.isComment}>Add Comment</button>
                    {comments ? <ul>
                        {comments.filter((comment)=> comment.parentId === id).map((comment,index)=>{
                          const date = new Date(parseInt(comment.timestamp,10));
                          return <li key={index}>
                              <h5><span className="glyphicon glyphicon-time"></span> Comment by {comment.author} at {date.toString()}</h5>
                              <p>{comment.body}</p>
                              <p>{comment.voteScore} likes     <button value="like" onClick={(e)=>{
                                    const voteScore = e.target.value;
                                    const id = comment.id;
                                    const parentId = comment.parentId;
                                    voteComment({id, parentId, voteScore});  //Updating the store using voteComment action dispatcher

                                    /* Updating the database */
                                    const values = {option:'upVote'}
                                    const headers = {
                                      'Accept': 'application/json',
                                      'Authorization': 'whatever-you-want'
                                    }
                                    fetch(`http://localhost:3001/comments/${id}`, {
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
                                    const id = comment.id;
                                    const parentId = comment.parentId;
                                    voteComment({id, parentId, voteScore});  //Updating the store using voteComment action dispatcher

                                    /* updating the database */
                                    const values = {option:'downVote'}
                                    const headers = {
                                      'Accept': 'application/json',
                                      'Authorization': 'whatever-you-want'
                                    }
                                    fetch(`http://localhost:3001/comments/${id}`, {
                                      method: 'POST',
                                      headers: {
                                        ...headers,
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify(values)
                                      }).then(res => res.json())
                                	}}>Dislike</button></p>
                              	<button value={comment.id} onClick={(e)=>{
	                                const id = e.target.value;
	                                const parentId = comment.parentId;

                                  /* Updating the database */
	                                const headers = {
	                                  'Accept': 'application/json',
	                                  'Authorization': 'whatever-you-want'
	                                };
	                                fetch(`http://localhost:3001/comments/${id}`, {
	                                  method: 'DELETE',
	                                  headers: {
	                                    ...headers,
	                                    'Content-Type': 'application/json'
	                                  },
	                                }).then(res => console.log(res.json()));

	                                  removeComment({id, parentId});  //Updating the store using removeComment action dispatcher
                                	}}>Delete</button>
                                <button onClick={this.commentEditTrue}>Edit</button>
                                {isCommentEdit && <div>
                                  <h4><small>Edit Comment:</small></h4>
                                  <form onSubmit={this.commentEdit}>
                                      <input type="hidden" name="id" value={comment.id}></input>
                                      <input type="hidden" name="timestamp" value={Date.now()} ></input>
                                      <input type="hidden" name="parentId" value= {id} ></input>
                                      <p>Author: </p>
                                      <input name="author" type="text" defaultValue={comment.author}></input>
                                      <p>Body:</p>
                                      <textarea name="body" className="form-control" rows="3" required defaultValue={comment.body} ></textarea>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                  </form>
                                  </div>}
                            </li>
                        })}
                        {isComment && <div>
                          <h4><small>New Comment:</small></h4>
                          <form onSubmit={this.commentSubmit}>
                              <input type="hidden" name="id" value={Math.random().toString(36).substr(-8)}></input>
                              <input type="hidden" name="timestamp" value={Date.now()} ></input>
                              <input type="hidden" name="parentId" value= {id} ></input>
                              <p>Author: </p>
                              <input name="author" type="text" ></input>
                              <p>Body:</p>
                              <textarea name="body" className="form-control" rows="3" required ></textarea>
                            <button type="submit" className="btn btn-success">Submit</button>
                          </form>
                          </div> }
                      </ul> : <p>Waiting</p>}
			</div>);
	}
}

export default Comments