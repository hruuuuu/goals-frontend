import { createContext, useContext } from 'react';

export const ActivityContext = createContext();

export function useActivity() {
  return useContext(ActivityContext);
}
