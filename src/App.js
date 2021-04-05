import React, { useEffect, useMemo } from 'react';
import './App.css';

import PostList from './components/post/PostList';

import { useActions as usePostsActions } from './store/posts';
import { useActions as useFilterPostActions } from './store/filter-post';

function App({ posts: { data, loading }, filterPost }) {
  const { getPosts } = usePostsActions();
  const { changeFilterPost } = useFilterPostActions();

  const filteredPosts = useMemo(() => {
    if (!filterPost) {
      return data;
    }
    return data.filter((post) => post.title.includes(filterPost));
  }, [data, filterPost]);

  const isFiltered = useMemo(() => !!filterPost, [filterPost]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return 'Loading...';
  }

  return (
    <div className="App">
      Search by title:
      <input
        data-testid="filterPost"
        value={filterPost}
        onChange={(event) => changeFilterPost(event.target.value)}
        autoFocus
      />
      <PostList data-testid="postList" data={filteredPosts} filtered={isFiltered} />
    </div>
  );
}

export default App;
