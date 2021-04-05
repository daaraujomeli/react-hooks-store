import React from 'react';

import PostItem from './PostItem';

export default function PostList({ data, filtered, ...props }) {
  return (
    <div {...props}>
      {data?.map((post) => (
        <PostItem key={post.id} post={post} filtered={filtered} />
      ))}
    </div>
  );
}
