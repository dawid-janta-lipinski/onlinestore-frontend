import { AppState } from 'src/app/store/app.reducer';
import { ProductState } from './products.reducer';
import { createSelector } from '@ngrx/store';

export const selectProducts = (state: AppState) => state.products;

export const selectProductsList = createSelector(
  selectProducts,
  (state: ProductState) => state.products,
);

export const selectProductsProduct = createSelector(
  selectProducts,
  (state: ProductState) => state.product,
);

export const selectProductsLoadin = createSelector(
  selectProducts,
  (state: ProductState) => state.loading,
);

export const selectProductsError = createSelector(
  selectProducts,
  (state: ProductState) => state.error,
);
