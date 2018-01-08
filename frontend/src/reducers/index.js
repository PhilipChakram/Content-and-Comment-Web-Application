import { combineReducers } from 'redux'

import {
  INIT_POST,
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  VOTE_POST,
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
			let y = {}; 
			posts.map((post)=>{
				y[post.id]=post;
			})
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
			return {
				...state,
				[ID]:{
					...state[ID],
					deleted:true
				}
			}

		case EDIT_POST :
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

		case VOTE_POST :
			if(action.voteScore === 'like')
			{
				return {
					...state,
					[action.id]:{
						...state[action.id],
						voteScore:state[action.id].voteScore + 1,
					}
				};
			}
			else if(action.voteScore === 'disLike')
			{
				return {
					...state,
					[action.id]:{
						...state[action.id],
						voteScore:state[action.id].voteScore - 1,
					}
				};
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
			let z = {}; 
			comment.map((c)=>{
				z[c.id]=c;
			})

			return {
				...state,
				[id]:{...z}
			};
			
		case ADD_COMMENT :
			const {parentId, timestamp, body, author} = action
			const ID = action.id;
			obj = state[parentId];			
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
		case VOTE_COMMENT :
			if(action.voteScore === 'like')
			return {
				...state,
				[action.parentId]:{
					...state[action.parentId],
					[action.id]:{
						...state[action.parentId][action.id],
					    voteScore:state[action.parentId][action.id].voteScore + 1,
					}
				}
			};
			else if(action.voteScore === 'disLike')
			return {
				...state,
				[action.parentId]:{
					...state[action.parentId],
					[action.id]:{
						...state[action.parentId][action.id],
					    voteScore:state[action.parentId][action.id].voteScore - 1,
					}
				}
			};

		default :
			return state
	}
}

export default combineReducers({
	posts,
	comment,
})