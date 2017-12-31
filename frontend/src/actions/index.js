export const INIT_POST = 'INIT_POST'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const INIT_COMMENT = 'INIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'



export function initialPost (posts) {
  return {
    type: INIT_POST,
    posts,
  }
}

export function addPost ({ id, timestamp, title, body, author, category}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
  }
}

export function removePost ({id}) {
  return {
    type: REMOVE_POST,
    id,
  }
}

export function initialComment ({id, comment}) {
  return {
    type:INIT_COMMENT,
    id,
    comment,
  }
}

export function addComment ({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
  return {
    type:ADD_COMMENT,
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

export function removeComment ({ id, deleted }) {
  return {
    type:REMOVE_COMMENT,
    id,
    deleted,
  }
}

export function voteComment ({category, post, comment, vote}) {
  return {
    type:VOTE_COMMENT,
    category,
    post,
    comment,
    vote,
  }
}