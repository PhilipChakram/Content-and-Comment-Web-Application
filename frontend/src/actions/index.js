export const INIT_POST = 'INIT_POST'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const INIT_COMMENT = 'INIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
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

export function editPost({id, title, body, author, category}) {
  return {
    type: EDIT_POST,
    id,
    title,
    body,
    author,
    category,
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

export function removeComment ({ id, parentId }) {
  return {
    type:REMOVE_COMMENT,
    id,
    parentId,
  }
}

export function editComment ({id, parentId, timestamp, body, author}) {
  return {
    type:EDIT_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
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