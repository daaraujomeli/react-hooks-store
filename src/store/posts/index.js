import { useCallback } from 'react';

import makeContext from '../context';

export const { context, useActionDispatcher } = makeContext();

export const ACTION_TYPES = {
  GET_POSTS: 'GET_POSTS',
  GET_POST_COMMENTS: 'GET_POST_COMMENTS',
  CHANGE_POST_TITLE: 'CHANGE_POST_TITLE',
  CHANGE_POST_COMMENT_NAME: 'CHANGE_POST_COMMENT_NAME',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
};

export const INITIAL_STATE = {
  data: [],
  loading: false,
};

export function useActions() {
  const dispatch = useActionDispatcher();
  const BASE_URI = 'https://jsonplaceholder.typicode.com';

  const getPosts = useCallback(async () => {
    dispatch(ACTION_TYPES.TOGGLE_LOADING);
    const posts = await fetch(`${BASE_URI}/posts`).then((response) => response.json());
    dispatch(ACTION_TYPES.GET_POSTS, { posts });
    dispatch(ACTION_TYPES.TOGGLE_LOADING);
  }, [dispatch]);

  const getComments = async (postId) => {
    const comments = await fetch(`${BASE_URI}/comments?postId=${postId}`).then((response) => response.json());
    dispatch(ACTION_TYPES.GET_POST_COMMENTS, { comments, postId });
  };

  const changePostTitle = (postId, postTitle) => {
    dispatch(ACTION_TYPES.CHANGE_POST_TITLE, { postId, postTitle });
  };

  const changePostComment = (postId, commentId, commentName) => {
    dispatch(ACTION_TYPES.CHANGE_POST_COMMENT_NAME, { postId, commentId, commentName });
  };

  return {
    getPosts,
    getComments,
    changePostTitle,
    changePostComment,
  };
}

export function reducer(draft, action) {
  const { posts, postId, postTitle, comments, commentId, commentName } = action.payload;
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS: {
      draft.data = posts;
      return;
    }
    case ACTION_TYPES.GET_POST_COMMENTS: {
      const post = draft.data.find((post) => post.id === postId);
      post.comments = comments;
      return;
    }
    case ACTION_TYPES.CHANGE_POST_TITLE: {
      const post = draft.data.find((post) => post.id === postId);
      post.title = postTitle;
      return;
    }
    case ACTION_TYPES.CHANGE_POST_COMMENT_NAME: {
      const post = draft.data.find((post) => post.id === postId);
      const comment = post.comments.find((comment) => comment.id === commentId);
      comment.name = commentName;
      return;
    }
    case ACTION_TYPES.TOGGLE_LOADING: {
      draft.loading = !draft.loading;
      return;
    }
  }
}
