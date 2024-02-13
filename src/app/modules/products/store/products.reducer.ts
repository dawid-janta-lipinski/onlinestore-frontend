import { Action, createReducer, on } from '@ngrx/store';
import { Product, SimpleProduct } from '../../core/models/product.model';
import * as ProductsActions from './products.actions';

export interface ProductState {
  totalCount: number;
  products: SimpleProduct[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  totalCount: 0,
  products: [],
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
      totalCount: action.totalCount,
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
