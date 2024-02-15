import { createAction, props } from '@ngrx/store';
import { Product, SimpleProduct } from '../../core/models/product.model';
import { Category } from '../../core/models/categories.model';

const FETCH_PRODUCTS_TYPE = '[Products] Fetch Products';
const FETCH_PRODUCTS_SUCCESS_TYPE = '[Products] Fetch Products Success';
const FETCH_PRODUCTS_FAILURE_TYPE = '[Products] Fetch Products Failure';

const FETCH_SINGLE_PRODUCT_TYPE = '[Products] Fetch Single Product';
const FETCH_SINGLE_PRODUCT_SUCCESS_TYPE =
  '[Products] Fetch Single Product Success';
const FETCH_SINGLE_PRODUCT_FAILURE_TYPE =
  '[Products] Fetch Single Product Failure';

const FETCH_CATEGORIES_TYPE = '[Products] Fetch Categories';
const FETCH_CATEGORIES_SUCCESS_TYPE = '[Products] Fetch Categories Success';
const FETCH_CATEGORIES_FAILURE_TYPE = '[Products] Fetch Categories Failure';

const SET_CATEGORY_TYPE = '[Products] Set Category';
const CLEAR_CATEGORY_TYPE = '[Products] Clear Category';

const CLEAR_ERROR = '[Products] Clear Error';

export const clearError = createAction(CLEAR_ERROR);

export const fetchSingleProduct = createAction(
  FETCH_SINGLE_PRODUCT_TYPE,
  props<{
    uuid: string;
  }>(),
);

export const fetchSingleProductSuccess = createAction(
  FETCH_SINGLE_PRODUCT_SUCCESS_TYPE,
  props<{ product: Product }>(),
);

export const fetchSingleProductFailure = createAction(
  FETCH_SINGLE_PRODUCT_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const fetchProducts = createAction(
  FETCH_PRODUCTS_TYPE,
  props<{
    value: string;
    category: string;
    priceMin: number;
    priceMax: number;
    pageIndex: number;
    limit: number;
    sortItem: string;
    order: string;
  }>(),
);

export const fetchProductsSuccess = createAction(
  FETCH_PRODUCTS_SUCCESS_TYPE,
  props<{ products: SimpleProduct[]; totalCount: number }>(),
);

export const fetchProductsFailure = createAction(
  FETCH_PRODUCTS_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const fetchCategories = createAction(FETCH_CATEGORIES_TYPE);

export const fetchCategoriesSucces = createAction(
  FETCH_CATEGORIES_SUCCESS_TYPE,
  props<{ categories: Category[] }>(),
);

export const fetchCategoriesFailure = createAction(
  FETCH_CATEGORIES_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const setCategory = createAction(
  SET_CATEGORY_TYPE,
  props<{ category: Category }>(),
);

export const clearCategory = createAction(CLEAR_CATEGORY_TYPE);
