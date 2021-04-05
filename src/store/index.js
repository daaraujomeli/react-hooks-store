import React, { useCallback } from 'react';
import { useImmerReducer } from 'use-immer';

export const compose = (...rest) => (x) => rest.reduceRight((y, f) => f(y), x);

export const withStore = (key, store) => (WrappedComponent) => (props) => {
  const { context, reducer, INITIAL_STATE } = store;
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);
  const actionDispatcher = useCallback((type, payload = {}) => dispatch({ type, payload }), [dispatch]);
  const nextState = { [key]: state };
  return (
    <context.Provider value={actionDispatcher}>
      <WrappedComponent {...nextState} {...props} />
    </context.Provider>
  );
};

export const connect = (stores) => {
  return compose(...Object.entries(stores).map(([key, store]) => withStore(key, store)));
};
