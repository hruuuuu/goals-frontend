import { createContext, useContext } from 'react';

export const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}
