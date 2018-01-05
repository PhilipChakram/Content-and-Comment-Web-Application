import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './App.css';

class Posts extends Component {

  state={
    modalOpen:false,
  }

  openFoodModal = () => {
    console.log("Open Modal");
    this.setState(() => ({
      modalOpen: true
    }))
  }
  closeFoodModal = () => {
    this.setState(() => ({
      modalOpen: false
    }))
  }


  
	render(){
		let posts = this.props.posts;
    const filter = this.props.filter;
    const removePost = this.props.removePost;
    const modalOpen = this.state.modalOpen;
    const setId = this.props.setId;
    const votePost = this.props.votePost;

    posts = filter ? posts.filter((post,index)=> post.category === filter) : posts;
    console.log(Date.now().toString());
		return(
            <div>
			       <h4><small>RECENT POSTS</small></h4>
              <hr/>
              {posts ? <ul name="Ul" onClick={this.openFoodModal}>
                {posts.map(({id,timestamp,author,body,title,category,voteScore},index)=>{
                  return <Link to={`/posts/${id}`} className='add-contact' key={id}>
          <li key={id} value={id}>
                    <h2>{title}</h2>
                    <h5><span className="glyphicon glyphicon-time"></span> Post by {author} at</h5>
                    <h5><span className="label label-success">{category}</span></h5><br/>
                    <p>{body}</p>
                    <p>{voteScore} likes  <button value="like" onClick={(e)=>{
                        const voteScore = e.target.value;
                        const values = {option:'upVote'}

                        votePost({id, voteScore});
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
                        votePost({id, voteScore});
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
                    {modalOpen && <button value={id} onClick={(e)=>{
                      const id = e.target.value;
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
                        removePost({id});
                      }}>Delete</button>}

                    {modalOpen && <Link
            to={`/posts/${id}`}
            className='add-contact'
          ><button onClick={this.openFoodModal}>Edit</button></Link>}
                     <hr/>
                  </li></Link>
                })}
              </ul> : <p>waiting</p>}
            

              <hr/>
            </div>
		);
	}
}

export default Posts