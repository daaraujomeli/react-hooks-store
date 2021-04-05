import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App.container';

const filterPost = 'filter post';

describe('App container test suite', () => {
  it('should filter post list', async () => {
    const { findByTestId } = render(<App />);
    const inputFilterPost = await findByTestId('filterPost');
    userEvent.paste(inputFilterPost, filterPost);
    expect(inputFilterPost).toHaveValue(filterPost);
  });
});
