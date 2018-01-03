import { combineReducers } from 'redux'

import {
  INIT_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  INIT_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
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
			return Object.keys(state).length === 0 ? y : state

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

		case EDIT_POST :

			console.log('From Edit Post',{
				...state,
				[action.id]:{
					...state[action.id],
					id:action.id,
					title:action.title,
					body:action.body,
					author:action.author,
					category:action.category,
				}
			})

			return {
				...state,
				[action.id]:{
					...state[action.id],
					id:action.id,
					title:action.title,
					body:action.body,
					author:action.author,
					category:action.category,
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
			//console.log("Comment reducer", id, comment);
			let z = {}; 
			comment.map((c)=>{
				z[c.id]=c;
			})

			console.log("Comment reducer", {
				...state,
				[id]:{...z}
			});
			//let c = state.comments;
			
			//c = c.concat([bdy]);
			//console.log();
			return {
				...state,
				[id]:{...z}
			};
			
		case ADD_COMMENT :
			const {parentId, timestamp, body, author, voteScore, deleted, parentDeleted} = action
			const ID = action.id;
			console.log('Add comment',state[parentId]);
			obj = state[parentId];

			console.log({
				...state,
				[parentId]:{
						...state[parentId],
						[ID]:{
						id: ID,
					    parentId: parentId,
					    timestamp: timestamp,
					    body: body,
					    author: author,
					    voteScore: 1,
					    deleted: false,
					    parentDeleted: false
					}
				}
			})
			
			return {
				...state,
				[parentId]:{
						...state[parentId],
						[ID]:{
						id: ID,
					    parentId: parentId,
					    timestamp: timestamp,
					    body: body,
					    author: author,
					    voteScore: 1,
					    deleted: false,
					    parentDeleted: false
					}
				}
			};

		case REMOVE_COMMENT :
			const Id = action.id;
			const pId = action.parentId;
			// obj = state[pId];
			// obj = obj.filter((comment) => comment.id !== Id);
			 console.log('Deleted Object',{
				...state,
				[pId]: {
					...state[pId],
					[Id]:{
						...state[pId][Id],
						deleted:true
					}
				} 
			});
			return {
				...state,
				[pId]: {
					...state[pId],
					[Id]:{
						...state[pId][Id],
						deleted:true
					}
				} 
			}

		case EDIT_COMMENT :
			console.log('Edit Comment',{
				...state,
				[action.parentId]:{
					...state[action.parentId],
					[action.id]:{
						...state[action.parentId][action.id],
					    timestamp: action.timestamp,
					    body: action.body,
					    author: action.author,
					}
				}
			});
			return {
				...state,
				[action.parentId]:{
					...state[action.parentId],
					[action.id]:{
						...state[action.parentId][action.id],
					    timestamp: action.timestamp,
					    body: action.body,
					    author: action.author,
					}
				}
			}

		default :
			return state
	}
}

export default combineReducers({
	posts,
	comment,
})