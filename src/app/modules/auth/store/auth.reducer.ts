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
  on(
    AuthActions.login,
    AuthActions.register,
    AuthActions.activate,
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
    AuthActions.registerSuccess,
    AuthActions.activateSuccess,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.registerFailure,
    (state, action): AuthState => ({
      ...state,
      loading: false,
      user: null,
      error: action.error,
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
  on(
    AuthActions.autoLogin,
    AuthActions.autoLoginFailure,
    AuthActions.logout,
    AuthActions.passwordRecovery,
    AuthActions.passwordChange,
    AuthActions.logoutFailure,
    (state, action): AuthState => ({
      ...state,
    }),
  ),
  on(
    AuthActions.autoLoginSuccess,
    (state, action): AuthState => ({
      ...state,
      user: new User(action.user.login, action.user.email, action.user.role),
    }),
  ),
  on(
    AuthActions.logoutSuccess,
    (state, action): AuthState => ({
      ...state,
      user: null,
    }),
  ),
  on(
    AuthActions.passwordRecoverySuccess,
    AuthActions.passwordChangeSuccess,
    AuthActions.clearError,
    (state, action): AuthState => ({
      ...state,
      error: null,
    }),
  ),
  on(
    AuthActions.passwordRecoveryFailure,
    AuthActions.passwordChangeFailure,
    (state, action): AuthState => ({
      ...state,
      error: action.error,
    }),
  ),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
