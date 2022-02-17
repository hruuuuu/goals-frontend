import { createContext, useContext } from 'react';

export const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export const ActivityContext = createContext();

export function useActivity() {
  return useContext(ActivityContext);
}
