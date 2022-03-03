import { createContext, useContext } from 'react';

export const DietlogContext = createContext();

export function useDietlog() {
  return useContext(DietlogContext);
}
