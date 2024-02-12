import { Action, createReducer, on } from '@ngrx/store';
import { Product, SimpleProduct } from '../../core/models/product.model';
import * as ProductsActions from './products.actions';

export interface ProductState {
  products: SimpleProduct[] | null;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  product: null,
  loading: false,
  error: null,
};

export const _productReducer = createReducer(
  initialState,
  on(
    ProductsActions.fetchProducts,
    (state, action): ProductState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    ProductsActions.fetchProductsSuccess,
    (state, action): ProductState => ({
      ...state,
      loading: false,
      products: action.products,
    }),
  ),
  on(
    ProductsActions.fetchProductsFailure,
    (state, action): ProductState => ({
      ...state,
      loading: false,
      error: action.error,
    }),
  ),
);

export function productReducer(
  state: ProductState | undefined,
  action: Action,
) {
  return _productReducer(state, action);
}
