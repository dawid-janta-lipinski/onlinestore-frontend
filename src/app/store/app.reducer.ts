import { AuthState } from '../modules/auth/store/auth.reducer';
import { ProductState } from '../modules/products/store/products.reducer';

export interface AppState {
  auth: AuthState;
  products: ProductState;
}
