import { createAction, props } from '@ngrx/store';
import { SimpleProduct } from '../../core/models/product.model';

const FETCH_PRODUCTS_TYPE = '[Products] Fetch Products';
const FETCH_PRODUCTS_SUCCESS_TYPE = '[Products] Fetch Products Success';
const FETCH_PRODUCTS_FAILURE_TYPE = '[Products] Fetch Products Failure';

const CLEAR_ERROR = '[Products] Clear Error';

export const clearError = createAction(CLEAR_ERROR);

export const fetchProducts = createAction(FETCH_PRODUCTS_TYPE);

export const fetchProductsSuccess = createAction(
  FETCH_PRODUCTS_SUCCESS_TYPE,
  props<{ products: SimpleProduct[] }>(),
);

export const fetchProductsFailure = createAction(
  FETCH_PRODUCTS_FAILURE_TYPE,
  props<{ error: string }>(),
);
