import { createContext, useContext } from 'react';

export default function makeContext() {
  const context = createContext(null);
  const useActionDispatcher = () => useContext(context);
  return {
    context,
    useActionDispatcher,
  };
}
