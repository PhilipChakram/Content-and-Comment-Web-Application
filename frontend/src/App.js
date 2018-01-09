import React, { Component } from 'react';
import Sidenav from './Sidenav.js';
import Posts from './Posts.js';
import AddPost from './AddPost.js';
import Comments from './Comments.js';
import SinglePost from './SinglePost.js'
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialPost,addPost,removePost, editPost, votePost, initialComment, addComment, removeComment, editComment, voteComment} from './actions';
import { withRouter } from 'react-router-dom';
import { Link, Switch } from 'react-router-dom';


class App extends Component {

  state = {
      category:[],
      sortSelect: "votes",
      isEdit: false,
  }
 
  sortSelect = (e)=>{
    this.setState({sortSelect:e.target.value})
  }

  componentDidMount() {
    const url = `http://localhost:3001/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => res.json())
      .then(({categories}) =>  this.setState({category:categories}));
  }

  render() {
    const data = this.state.category;
    const {post, removePost, votePost, editPost, addComment, removeComment, voteComment, editComment, comments} = this.props
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row content">

            <Switch>
              <Route exact path="/" render = {() => (
                <div> 
                  <Sidenav data={data}></Sidenav>

                  <div className="col-sm-9">
                    <Link to='/'>View All Posts</Link>
                    <p>Sort by:</p>
                    <select onChange={this.sortSelect}>
                      <option value="votes">Votes</option>
                      <option value="timeStamp">Time Stamp</option>
                    </select>
                    <Posts posts={post} filter="" removePost={removePost} setId={this.setId} votePost={votePost} sort={this.state.sortSelect}></Posts>
                    <AddPost formSubmit={this.formSubmit} addPost={this.props.addPost}></AddPost>
                    <br/><br/>
                  </div>

                </div>)}/>

              <Route exact path="/:category" render={(props) => (
                  <div>
                    {data.filter((category)=> category.name === props.match.params.category).length ? <div>
                      <Sidenav data={data}></Sidenav>
                      <div className="col-sm-9">
                        <Link to='/'>View All Posts</Link>
                        <p>Sort by:</p>
                        <select onChange={this.sortSelect}>
                          <option value="votes">Votes</option>
                          <option value="timeStamp">Time Stamp</option>
                        </select>
                        <Posts posts={post} filter={props.match.params.category} removePost={removePost} setId={this.setId} votePost={votePost} sort={this.state.sortSelect}></Posts>
                        <AddPost formSubmit={this.formSubmit} addPost={this.props.addPost}></AddPost>
                        <br/><br/> 
                      </div>
                      </div> : <h2>Error 404: Page not found</h2>}
                    </div> )}/>

              <Route exact path="/:category/:id" render = {(props) => (
                 <div>
                    {post.filter((post)=> post.id === props.match.params.id).length ? <div>
                      <Sidenav data={data}></Sidenav>
                    <Link to='/'>View All Posts</Link>
                    <SinglePost post={post} id={props.match.params.id} votePost={votePost} removePost={removePost} editPost={editPost}></SinglePost>
                    <Comments comments={comments} id={props.match.params.id} voteComment={voteComment} removeComment={removeComment} editComment={editComment} addComment={addComment}></Comments>
                    </div> : <h2>Error 404: Post Not Found</h2>}
                 </div> )}/>

              <Route render={(props) => (
                  <h2>Error 404: Page not found</h2>
                )}/>
            </Switch>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, comment }) {
  let comments = [];
  Object.entries(comment).forEach(([key, value]) => {
    Object.entries(value).forEach(([key, value]) => {
          comments.push(value)
    })
  });
  comments = comments.filter((comment)=> comment.deleted === false);
  //Reducing merging array of arrays
  //comments = [].concat.apply([],comments);
  

  let post = []
  Object.entries(posts).forEach(([key, value]) => {
    post.push(value);
  });
  post = post.filter((post)=> post.deleted === false);
  return {post, comments};
}

function mapDisptachToProps (dispatch) {
  return {
    initialPost: (data) => dispatch(initialPost(data)),
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    editPost: (data) => dispatch(editPost(data)),
    votePost: (data) => dispatch(votePost(data)),
    initialComment: (data) => dispatch(initialComment(data)),
    addComment: (data) => dispatch(addComment(data)),
    removeComment: (data) => dispatch(removeComment(data)),
    editComment: (data) => dispatch(editComment(data)),
    voteComment: (data) => dispatch(voteComment(data)),
  }
}

export default withRouter(connect(
  mapStateToProps, 
  mapDisptachToProps
)(App))
