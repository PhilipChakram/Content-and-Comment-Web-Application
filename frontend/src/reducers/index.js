import { combineReducers } from 'redux'

import {
  INIT_POST,
  ADD_POST,
  REMOVE_POST,
  INIT_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  VOTE_COMMENT,
} from '../actions'

// const fetchURL = (url) => {
//     	console.log('fetching from url at index', url);
//     	return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
//       	.then( (res) => res.json())
//       	.then((post) => {
//       		console.log(post);
//       		return {post};
//       	});
// }

// const url1 = `http://localhost:3001/posts`;

// const initialPost = fetchURL(url1).then(alert);

function posts (state = {}, action) {
	switch (action.type) {
		case INIT_POST :
			const {posts} = action
			console.log('From reducer', posts.post);
			return posts

		case ADD_POST :
			const {id, timestamp, title, body, author, category} = action
			const dState = {
			
					id: id,
					timestamp: timestamp,
					title: title,
					body: body,
					author: author,
					category: category,
					voteScore: 1,
					deleted: false,
					commentCount: 0,
			}
			console.log('From addPost',state.post);
			let b = state.post;
			b = b.concat([dState]);
			return {
				post:[...b]
			}

		// case REMOVE_POST :
		// 	const {id, deleted} = action
		// 	return {
		// 		...state,
		// 		[id]: {
		// 			...state[id],
		// 			deleted: deleted,
		// 		}
		// 	}

		default :
			return state
	}
}

function comment (state = {}, action) {
	switch(action.type) {
		case INIT_COMMENT :
			const { comment } = action
			return comment
			
		case ADD_COMMENT :
			const {id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted} = action
			return {
				...state,
				[id]: {
					id,
					parentId,
					timestamp,
	    			body,
	    			author,
	    			voteScore,
	    			deleted,
	    			parentDeleted,
				}
			}

		// case REMOVE_COMMENT :
		// 	const {id, deleted} = action
		// 	return {
		// 		...state,
		// 		[id]: {
		// 			...state[id],
		// 			deleted: deleted,
		// 		}
		// 	}

		default :
			return state
	}
}

export default combineReducers({
	posts,
	comment,
})