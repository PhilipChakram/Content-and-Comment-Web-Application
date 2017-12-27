import React, { Component } from 'react';
import Sidenav from './Sidenav.js'
import Posts from './Posts.js'
import './App.css';
import { connect } from 'react-redux'
import { initialPost,addPost,removePost, addComment, removeComment} from './actions'
import serializeForm from 'form-serialize'

class App extends Component {

  state = {
      category:[],
      posts:[]
  }


  addPost = () => {
    const id = '8xf0y6ziyjabvozdd253nd';
    const timestamp = Date.now();
    
  }

  formSubmit = (e) => {
    e.preventDefault()
    let token = localStorage.token

    const id = this.id.value;
    const timestamp = this.timeStamp.value;
    const title = this.title.value;
    const body = this.body.value;
    const author = this.author.value;
    const category = this.category.value;

    const {addPost} = this.props;

    const a = {id, timestamp, title, body, author, category};
    addPost(a);

    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)

    const values = serializeForm(e.target, { hash: true })
    const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }

    fetch(`http://localhost:3001/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    }).then(res => res.json())
  
  }

  componentDidMount() {
    const url = `http://localhost:3001/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => res.json())
      .then(({categories}) =>  this.setState({category:categories}));

    // const url1 = `http://localhost:3001/posts`;
    // console.log('fetching from url', url1);
    // fetch(url1, { headers: { 'Authorization': 'whatever-you-want' }} )
    //   .then( (res) => res.json())
    //   .then((post) => this.setState({posts:post}));
  }

  render() {
    const data = this.state.category;
    console.log(data);

    // const posts = this.state.posts;
    // console.log(posts);

    const {posts, initialPost, addPost, removePost,addComment, removeComment} = this.props

    console.log('Main App',posts);
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row content">

            <Sidenav data={data}></Sidenav>

            <div className="col-sm-9">
              
              <Posts posts={posts}></Posts>

              <h4>Add Post:</h4>
              <form  id="form-data" onSubmit={this.formSubmit} ref={(form) => this.form = form} >
                  <input type="hidden" name="id" value="17483984kjdbs3qr89" ref={(id) => this.id = id}></input>
                  <input type="hidden" name="timestamp" value={Date.now().toString()} ref={(timeStamp) => this.timeStamp = timeStamp}></input>
                  <p>Author: </p>
                  <input name="author" type="text" ref={(author) => this.author = author}></input>
                  <p>Title: </p>
                  <input name="title" type="text" ref={(title) => this.title = title}></input>
                  <p>Category: </p>
                    <select name="category" ref={(category) => this.category = category}>
                      <option value="react">React</option>
                      <option value="redux">Redux</option>
                      <option value="udacity">Udacity</option>
                    </select>
                  <p>Body:</p>
                  <textarea name="body" className="form-control" rows="3" required ref={(body) => this.body = body}></textarea>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
              <br/><br/>

              <h4>Leave a Comment:</h4>
              <form role="form">
                <div className="form-group">
                  <textarea className="form-control" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
              <br/><br/>
      
              <p><span className="badge">2</span> Comments:</p><br/>
      
              <div className="row">
                <div className="col-sm-2 text-center">
                  <img src="bandmember.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
                </div>
                <div className="col-sm-10">
                  <h4>Anja <small>Sep 29, 2015, 9:12 PM</small></h4>
                  <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <br/>
                </div>
                <div className="col-sm-2 text-center">
                  <img src="bird.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
                </div>
                <div className="col-sm-10">
                  <h4>John Row <small>Sep 25, 2015, 8:25 PM</small></h4>
                  <p>I am so happy for you man! Finally. I am looking forward to read about your trendy life. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <br/>
                  <p><span className="badge">1</span> Comment:</p><br/>
                  <div className="row">
                    <div className="col-sm-2 text-center">
                      <img src="bird.jpg" className="img-circle" height="65" width="65" alt="Avatar"/>
                    </div>
                    <div className="col-xs-10">
                      <h4>Nested Bro <small>Sep 25, 2015, 8:28 PM</small></h4>
                      <p>Me too! WOW!</p>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comment }) {
  return {posts}
}

function mapDisptachToProps (dispatch) {
  return {
    initialPost: (data) => dispatch(initialPost(data)),
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    addComment: (data) => dispatch(addComment(data)),
    removeComment: (data) => dispatch(removeComment(data))
  }
}

export default connect(
  mapStateToProps, 
  mapDisptachToProps
)(App)
