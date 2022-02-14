import { createContext, useContext } from 'react';

export const ShowContext = createContext();

export function useShow() {
  return useContext(ShowContext);
}
