import { createContext, useContext } from 'react';

export const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}
