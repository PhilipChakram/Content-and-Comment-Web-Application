import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { initialPost, initialComment } from './actions'



const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const url1 = `http://localhost:3001/posts`;
console.log('fetching from url', url1);
fetch(url1, { headers: { 'Authorization': 'whatever-you-want' }} )
   .then( (res) => res.json())
   .then((post) => {
    store.dispatch(initialPost({post}))
   	console.log(post)
    post.map((post)=>{
      const id = post.id;
      const url2 = `http://localhost:3001/posts/${id}/comments`;
      console.log('fetching from url', url2);
      fetch(url2, { headers: { 'Authorization': 'whatever-you-want' }} )
        .then( (res) => res.json())
        .then((comment) => {
            store.dispatch(initialComment({id,comment}));
        });
    });
   });

ReactDOM.render(
	 <Provider store={store}>
   <BrowserRouter>
		<App />
    </BrowserRouter>
	 </Provider>,
	document.getElementById('root'));
registerServiceWorker();
