import { Action, createReducer, on, props } from "@ngrx/store";
import { User } from "../../core/models/auth.model";
import * as AuthActions from "./auth.actions"

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

export const _authReducer = createReducer(
    initialState,
    //login
    on(AuthActions.login, (state, action) => ({
        ...state,
         loading: true
        })),
    on(AuthActions.loginSuccess, (state, action) => ({
        ...state,
        loading: false,
        user: action.user,
        error: null
    })),
    on(AuthActions.loginFailure, (state, action) => ({
        ...state,
        loading: false,
        user: null,
        error: action.error
    })),
    //register
    on(AuthActions.register, (state, action) => ({
        ...state,
         loading: true
        })),
    on(AuthActions.registerSuccess, (state, action) => ({
        ...state,
        loading: false,
        error: null
    })),
    on(AuthActions.registerFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),
    //clear error
    on(AuthActions.clearError, (state, action) => ({
        ...state,
        error: null
    })),
    )

export function authReducer(state: AuthState | undefined, action: Action ){
    return _authReducer(state, action);
}

