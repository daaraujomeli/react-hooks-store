import { useCallback } from 'react';

import makeContext from '../context';

export const { context, useActionDispatcher } = makeContext();

export const ACTION_TYPES = {
  CHANGE_FILTER_POST: 'CHANGE_FILTER_POST',
};

export const INITIAL_STATE = '';

export function useActions() {
  const dispatch = useActionDispatcher();

  const changeFilterPost = useCallback(
    (value) => {
      dispatch(ACTION_TYPES.CHANGE_FILTER_POST, value);
    },
    [dispatch],
  );

  return {
    changeFilterPost,
  };
}

export function reducer(draft, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_FILTER_POST: {
      return action.payload;
    }
  }
}
