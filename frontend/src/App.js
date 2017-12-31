import React, { Component } from 'react';
import Sidenav from './Sidenav.js'
import Posts from './Posts.js'
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { initialPost,addPost,removePost, initialComment, addComment, removeComment} from './actions'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';


class App extends Component {

  state = {
      category:[],
      filter: "",
      isEdit: false,
      isComment: false,
  }


  addPost = () => {
    const id = '8xf0y6ziyjabvozdd253nd';
    const timestamp = Date.now();
    
  }

  formSubmit = (e) => {
    e.preventDefault()
    let token = localStorage.token

    

    const {addPost} = this.props;

    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)

    const values = serializeForm(e.target, { hash: true })
    addPost(values);
    console.log('Add Form Values',values);
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

  editTrue = ()=> {
    this.setState({isEdit:true});
  }

  editFalse = ()=> {
    this.setState({isEdit:false});
  }

  filterCategory = (e) => {
    this.setState({filter:e.target.innerHTML})
  }

  setId = (id,e) => {
    console.log("Set Id",id);
    //this.setState({postId:e.target.value});
  }

  resetFilter = () => {
    this.setState({filter:""});
  }

  isComment = ()=> {
    console.log("is comment called")
    this.setState({isComment:true});
  }

  commentSubmit = (e)=>{
    e.preventDefault()
    let token = localStorage.token
    if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)
    const values = serializeForm(e.target, { hash: true })
    const headers = {
      'Accept': 'application/json',
      'Authorization': token
    }

    // fetch(`http://localhost:3001/posts`, {
    // method: 'POST',
    // headers: {
    //   ...headers,
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify(values)
    // }).then(res => res.json())
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

    const {posts, initialPost, addPost, removePost,addComment, removeComment, comment} = this.props
    console.log("This is comment state",comment);
    const post = posts.post;
    const comments = comment.comments;
    const isEdit = this.state.isEdit;
    const isComment = this.state.isComment;

    console.log('Main App',post);
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row content">

            <Route exact path="/" render = {() => (
                  <div> 
              <div className="col-sm-3 sidenav">

              <h4>Johns Blog</h4>
              <ul className="nav nav-pills nav-stacked" onClick={this.filterCategory}>
                  {data.map(({name},index)=>{
                    return <li key={name}><a href="#" key={index}>{name}</a></li>
                  })}
              </ul><br/>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Blog.."></input>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>

            </div>


            <div className="col-sm-9">

              <a href="#" onClick={this.resetFilter}>Reset</a>

              <Posts posts={posts} filter={this.state.filter} removePost={removePost} setId={this.setId}></Posts>

              

              
            </div>
            </div>
                )}/>

            <Route exact path="/posts" render = {() => (
                  <div> 
              <div className="col-sm-3 sidenav">

              <h4>Johns Blog</h4>
              <ul className="nav nav-pills nav-stacked" onClick={this.filterCategory}>
                  {data.map(({name},index)=>{
                    return <li key={name}><a href="#" key={index}>{name}</a></li>
                  })}
              </ul><br/>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Blog.."></input>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>

            </div>


            <div className="col-sm-9">

              <a href="#" onClick={this.resetFilter}>Reset</a>

              <Posts posts={posts} filter={this.state.filter} removePost={removePost} setId={this.setId}></Posts>

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

              
            </div>
            </div>
                )}/>

            <Route path="/posts/:id" render = {(props) => (
                  <div>
                   <h4><small>RECENT POSTS</small></h4>
                    <hr/>
                    {post ? <ul name="Ul" onClick={this.openFoodModal}>
                      {post.filter((post)=> post.id === props.match.params.id).map(({id,timestamp,author,body,title,category},index)=>{
                        return <li key={id} value={id}>
                          <a href="#"><h2>{title}</h2></a>
                          <h5><span className="glyphicon glyphicon-time"></span> Post by {author} at</h5>
                          <h5><span className="label label-success">{category}</span></h5><br/>
                          <p>{body}</p>
                          <button value={id} onClick={(e)=>{
                            const id = e.target.value;
                            let token = localStorage.token
                            if (!token)
                              token = localStorage.token = Math.random().toString(36).substr(-8);
                            const headers = {
                              'Accept': 'application/json',
                              'Authorization': token
                            };
                            fetch(`http://localhost:3001/posts/${id}`, {
                              method: 'DELETE',
                              headers: {
                                ...headers,
                                'Content-Type': 'application/json'
                              },
                            }).then(res => console.log(res.json()));
                              removePost({id});
                            }}>Delete</button>

                          <button onClick={this.editTrue}>Edit</button>
                           <hr/>
                           {isEdit && <form  id="form-data" onSubmit={this.formSubmit} ref={(form) => this.form = form} >
                              <input type="hidden" name="id" value="17483984kjdbs3qr89" ref={(id) => this.id = id}></input>
                              <input type="hidden" name="timestamp" value={Date.now().toString()} ref={(timeStamp) => this.timeStamp = timeStamp}></input>
                              <p>Author: </p>
                              <input name="author" type="text" ref={(author) => this.author = author} defaultValue={author}></input>
                              <p>Title: </p>
                              <input name="title" type="text" ref={(title) => this.title = title} defaultValue={title}></input>
                              <p>Category: </p>
                                <select name="category" ref={(category) => this.category = category}>
                                  <option value="react">React</option>
                                  <option value="redux">Redux</option>
                                  <option value="udacity">Udacity</option>
                                </select>
                              <p>Body:</p>
                              <textarea name="body" className="form-control" rows="3" required ref={(body) => this.body = body} defaultValue={body}></textarea>
                            <button type="submit" className="btn btn-success">Submit</button>
                          </form>}
                        </li>
                      })}
                    </ul> : <p>waiting</p>}
                    
                    {comments ? <ul>
                        <h4><small>COMMENTS:</small></h4>
                        <button onClick={this.isComment}>Add Comment</button>
                        {comments.filter((comment)=> comment.id === props.match.params.id).map(({comments})=>{
                          return comments.map(({id,author,body})=>{
                            return <li key={id}>
                              <h5><span className="glyphicon glyphicon-time"></span> Post by {author} at</h5>
                              <p>{body}</p>
                              <hr/>
                            </li>
                          });
                        })}
                        {isComment && <div>
                          <h4><small>New Comment:</small></h4>
                          <form onSubmit={this.formSubmit}>
                              <input type="hidden" name="id" value="17483984kjdbs3nys7"></input>
                              <input type="hidden" name="timestamp" value={Date.now().toString()} ></input>
                              <input type="hidden" name="parentId" value= {props.match.params.id} ></input>
                              <p>Author: </p>
                              <input name="author" type="text" ></input>
                              <p>Title: </p>
                              <input name="title" type="text" ></input>
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
                          </div> }
                      </ul> : <p>Waiting</p>}

                    <hr/>
                  </div>

                )}/>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comment }) {
  return {posts, comment};
}

function mapDisptachToProps (dispatch) {
  return {
    initialPost: (data) => dispatch(initialPost(data)),
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    initialComment: (data) => dispatch(initialComment(data)),
    addComment: (data) => dispatch(addComment(data)),
    removeComment: (data) => dispatch(removeComment(data))
  }
}

export default withRouter(connect(
  mapStateToProps, 
  mapDisptachToProps
)(App))
