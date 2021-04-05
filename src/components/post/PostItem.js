import React, { memo } from 'react';

import { useActions } from '../../store/posts';

function PostItem({ post, filtered }) {
  const { changePostTitle, changePostComment, getComments } = useActions();

  return (
    <>
      <hr />
      Title: {post.title}
      <p>{post.body}</p>
      {!filtered && <p>Comments: {post.comments?.map((comment) => comment.name).join(', ')}</p>}
      <button type="button" onClick={() => changePostTitle(post.id, 'new state of title')}>
        Change title
      </button>
      <button type="button" onClick={() => getComments(post.id)}>
        Get comments
      </button>
      {post.comments?.length && (
        <button type="button" onClick={() => changePostComment(post.id, post.comments[0].id, 'new state of comment')}>
          Change comment
        </button>
      )}
    </>
  );
}

export default memo(PostItem);
