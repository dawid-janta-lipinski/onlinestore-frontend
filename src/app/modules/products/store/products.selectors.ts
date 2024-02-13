import { AppState } from 'src/app/store/app.reducer';
import { ProductState } from './products.reducer';
import { createSelector } from '@ngrx/store';

export const selectProducts = (state: AppState) => state.products;

export const selectTotalCount = createSelector(
  selectProducts,
  (state: ProductState) => state.totalCount,
);
export const selectProductsList = createSelector(
  selectProducts,
  (state: ProductState) => state.products,
);

export const selectProductsProduct = createSelector(
  selectProducts,
  (state: ProductState) => state.product,
);

export const selectProductsLoading = createSelector(
  selectProducts,
  (state: ProductState) => state.loading,
);

export const selectProductsError = createSelector(
  selectProducts,
  (state: ProductState) => state.error,
);
