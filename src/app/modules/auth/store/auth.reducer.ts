import { Action, createReducer, on, props } from '@ngrx/store';
import { User } from '../../core/models/auth.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const _authReducer = createReducer(
  initialState,
  //login
  on(
    AuthActions.login,
    (state, action): AuthState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      user: new User(action.user.login, action.user.email, action.user.role),
      error: null,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      user: null,
      error: action.error,
    }),
  ),
  //logout
  on(
    AuthActions.logout,
    (state, action): AuthState => ({
      ...state,
    }),
  ),
  on(
    AuthActions.logoutSuccess,
    (state, action): AuthState => ({
      ...state,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      user: null,
      error: null,
    }),
  ),
  //register
  on(
    AuthActions.register,
    (state, action): AuthState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    AuthActions.registerSuccess,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    AuthActions.registerFailure,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      error: action.error,
    }),
  ),
  //activate account
  on(
    AuthActions.activate,
    (state, action): AuthState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    AuthActions.activateSuccess,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    AuthActions.activateFailure,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      error: action.error,
    }),
  ),
  //clear error
  on(
    AuthActions.clearError,
    (state, action): AuthState => ({
      ...state,
      error: null,
    }),
  ),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
