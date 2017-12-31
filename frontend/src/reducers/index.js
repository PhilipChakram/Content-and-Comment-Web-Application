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


function posts (state = {}, action) {
	switch (action.type) {
		case INIT_POST :
			const {posts} = action
			console.log('From reducer initial state', state);
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

		case REMOVE_POST :
			const ID = action.id;
			let a = state.post;
			a = a.map((post) => {
				if(post.id === ID)
					post.deleted = true;
				return post;
			})
			a = a.filter((post)=> post.deleted === false)

			console.log(a);
			return {
				post:[...a]
			}

		default :
			return state
	}
}

function comment (state = {comments:[]}, action) {
	switch(action.type) {
		case INIT_COMMENT :
			const {id, comment } = action;
			console.log("Comment reducer", id, comment);
			console.log("State", state);
			let c = state.comments;
			const bdy = {
				id:id,
				comments:[...comment]
			};
			c = c.concat([bdy]);
			console.log();
			return {
				comments:[...c]
			};
			
		case ADD_COMMENT :
			const {ID, parentId, timestamp, body, author, voteScore, deleted, parentDeleted} = action
			let d = state.comments;
			const obj = {
				id: ID,
				comments:[]
			}
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