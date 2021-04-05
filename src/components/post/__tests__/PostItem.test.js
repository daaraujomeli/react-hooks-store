import React from 'react';
import { render } from '@testing-library/react';

import PostItem from '../PostItem';

import * as storePosts from '../../../store/posts';

const changePostTitle = jest.fn();
const changePostComment = jest.fn();
const getComments = jest.fn();

const post = { id: 1, title: 'post title' };
const comments = [{ id: 123 }];

describe('PostItem test suite', () => {
  it('should render post with title', () => {
    const { getByText } = render(<PostItem post={post} />);
    expect(getByText(`Title: ${post.title}`)).toBeInTheDocument();
  });

  it('should change post title with action', () => {
    jest.spyOn(storePosts, 'useActions').mockImplementationOnce(() => ({ changePostTitle }));
    const { getByText } = render(<PostItem post={post} />);
    getByText('Change title').click();
    expect(changePostTitle).toHaveBeenCalledWith(post.id, 'new state of title');
  });

  it('should get post comments with action', () => {
    jest.spyOn(storePosts, 'useActions').mockImplementationOnce(() => ({ getComments }));
    const { getByText } = render(<PostItem post={post} />);
    getByText('Get comments').click();
    expect(getComments).toHaveBeenCalledWith(post.id);
  });

  it('should change post comment with action', () => {
    jest.spyOn(storePosts, 'useActions').mockImplementationOnce(() => ({ changePostComment }));
    const { getByText } = render(<PostItem post={{ ...post, comments }} />);
    getByText('Change comment').click();
    expect(changePostComment).toHaveBeenCalledWith(post.id, comments[0].id, 'new state of comment');
  });
});
