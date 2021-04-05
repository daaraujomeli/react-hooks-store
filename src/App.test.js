import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

import * as storePosts from './store/posts';
import * as storeFilterPost from './store/filter-post';

const getPosts = jest.fn();
const changeFilterPost = jest.fn();

const posts = {
  data: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
    },
  ],
};
const filterPost = 'filter post';
const defaultProps = {
  posts: storePosts.INITIAL_STATE,
  filterPost: storeFilterPost.INITIAL_STATE,
};

describe('App test suite', () => {
  beforeEach(() => {
    jest.spyOn(storePosts, 'useActions').mockImplementation(() => ({ getPosts }));
  });

  it('should render post list', () => {
    const { getByTestId } = render(<App {...defaultProps} />);
    expect(getByTestId('postList')).toBeInTheDocument();
  });

  it('should render search input with focus', () => {
    const { getByText, getByTestId } = render(<App {...defaultProps} />);
    expect(getByText('Search by title:')).toBeInTheDocument();
    expect(getByTestId('filterPost')).toHaveFocus();
  });

  it('should render search input with value', () => {
    const { getByTestId } = render(<App {...defaultProps} filterPost={filterPost} />);
    expect(getByTestId('filterPost')).toHaveValue(filterPost);
  });

  it('should filter post list with existing title', () => {
    const { getByText } = render(<App {...defaultProps} posts={posts} filterPost={posts.data[0].title} />);
    expect(getByText(`Title: ${posts.data[0].title}`)).toBeInTheDocument();
  });

  it('should filter post list with not existing title', () => {
    const { getByTestId } = render(<App {...defaultProps} posts={posts} filterPost={filterPost} />);
    expect(getByTestId('postList')).toBeEmptyDOMElement();
  });

  it('should change filter post with action', () => {
    jest.spyOn(storeFilterPost, 'useActions').mockImplementationOnce(() => ({ changeFilterPost }));
    const { getByTestId } = render(<App {...defaultProps} posts={posts} />);
    userEvent.paste(getByTestId('filterPost'), filterPost);
    expect(changeFilterPost).toHaveBeenCalledWith(filterPost);
  });
});
