import { createContext, useContext } from 'react';

export const CartListContext = createContext();

export function useCartList() {
  return useContext(CartListContext);
}
