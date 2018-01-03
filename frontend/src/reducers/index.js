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
			console.log('From reducer initial state', posts);
			let y = {}; 
			posts.map((post)=>{
				y[post.id]=post;
			})
			console.log(y);
			return y

		case ADD_POST :
			const {id, timestamp, title, body, author, category} = action
			return {
				...state,
				[id]:{
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
			}

		case REMOVE_POST :
			const ID = action.id;
			

			console.log('Remove Post',{
				...state,
				[ID]:{
					...state[ID],
					deleted:true
				}
			});
			return {
				...state,
				[ID]:{
					...state[ID],
					deleted:true
				}
			}

		default :
			return state
	}
}

function comment (state = {}, action) {
	let obj=[];
	switch(action.type) {
		case INIT_COMMENT :
			const {id, comment } = action;
			console.log("Comment reducer", id, comment);
			console.log("State", state);
			//let c = state.comments;
			const bdy = {
				[id]:[...comment]
			};
			//c = c.concat([bdy]);
			//console.log();
			return {
				...state,
				...bdy,
			};
			
		case ADD_COMMENT :
			const {parentId, timestamp, body, author, voteScore, deleted, parentDeleted} = action
			const ID = action.id;
			console.log('Add comment',state[parentId]);
			obj = state[parentId];
			
			return {
				...state,
				[parentId]: obj ? obj.concat([{
					id: ID,
				    parentId: parentId,
				    timestamp: timestamp,
				    body: body,
				    author: author,
				    voteScore: 1,
				    deleted: false,
				    parentDeleted: false
				}]) : [{
					id: ID,
				    parentId: parentId,
				    timestamp: timestamp,
				    body: body,
				    author: author,
				    voteScore: 1,
				    deleted: false,
				    parentDeleted: false
				}]
			};

		case REMOVE_COMMENT :
			const Id = action.id;
			const pId = action.parentId;
			obj = state[pId];
			obj = obj.filter((comment) => comment.id !== Id);
			console.log('Deleted Object',obj);
			return {
				...state,
				[pId]: obj 
			}

		default :
			return state
	}
}

export default combineReducers({
	posts,
	comment,
})