import React, { Component } from 'react';
import './App.css';

class Posts extends Component {
  
	render(){
		const posts = this.props.posts.post;
    console.log(Date.now().toString());
		return(
            <div>
			       <h4><small>RECENT POSTS</small></h4>
              <hr/>
              {posts ? <ul>
                {posts.map(({timestamp,author,body,title,category},index)=>{
                  return <li key={index}>
                    <h2>{title}</h2>
                    <h5><span className="glyphicon glyphicon-time"></span> Post by {author} at</h5>
                    <h5><span className="label label-success">{category}</span></h5><br/>
                    <p>{body}</p>   
                    <hr/>
         
                  </li>
                })}
              </ul> : <p>waiting</p>}
              
              <hr/>
            </div>
		);
	}
}

export default Posts