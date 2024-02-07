import { createAction, props } from '@ngrx/store';
import { IUser, LoginData, RegisterData } from '../../core/models/auth.model';

const LOGIN_TYPE = '[Auth] Login';
const LOGIN_SUCCESS_TYPE = '[Auth] Login Success';
const LOGIN_FAILURE_TYPE = '[Auth] Login Failure';

const AUTO_LOGIN_TYPE = '[Auth] Auto Login';
const AUTO_LOGIN_SUCCESS_TYPE = '[Auth] Auto Login Success';
const AUTO_LOGIN_FAILURE_TYPE = '[Auth] Auto Login Failure';

const REGISTER_TYPE = '[Auth] Register';
const REGISTER_SUCCESS_TYPE = '[Auth] Register Success';
const REGISTER_FAILURE_TYPE = '[Auth] Register Failure';

const ACTIVATE_TYPE = '[Auth] Activate';
const ACTIVATE_SUCCESS_TYPE = '[Auth] Activate Success';
const ACTIVATE_FAILURE_TYPE = '[Auth] Activate Failure';

const LOGOUT_TYPE = '[Auth] Logout';
const LOGOUT_SUCCESS_TYPE = '[Auth] Logout Success';
const LOGOUT_FAILURE_TYPE = '[Auth] Logout Failure';

const PASSWORD_RECOVERY_TYPE = '[Auth] PasswordRecovery';
const PASSWORD_RECOVERY_SUCCESS_TYPE = '[Auth] PasswordRecovery Success';
const PASSWORD_RECOVERY_FAILURE_TYPE = '[Auth] PasswordRecovery Failure';

const PASSWORD_CHANGE_TYPE = '[Auth] PasswordChange';
const PASSWORD_CHANGE_SUCCESS_TYPE = '[Auth] PasswordChange Success';
const PASSWORD_CHANGE_FAILURE_TYPE = '[Auth] PasswordChange Failure';

const CLEAR_ERROR = '[Auth] Clear Error';
//login
export const login = createAction(
  LOGIN_TYPE,
  props<{ loginData: LoginData }>(),
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS_TYPE,
  props<{ user: IUser }>(),
);

export const loginFailure = createAction(
  LOGIN_FAILURE_TYPE,
  props<{ error: string }>(),
);
//autologin
export const autoLogin = createAction(AUTO_LOGIN_TYPE);

export const autoLoginSuccess = createAction(
  AUTO_LOGIN_SUCCESS_TYPE,
  props<{ user: IUser }>(),
);

export const autoLoginFailure = createAction(AUTO_LOGIN_FAILURE_TYPE);
//register
export const register = createAction(
  REGISTER_TYPE,
  props<{ registerData: RegisterData }>(),
);

export const registerSuccess = createAction(REGISTER_SUCCESS_TYPE);

export const registerFailure = createAction(
  REGISTER_FAILURE_TYPE,
  props<{ error: string }>(),
);
//activate
export const activate = createAction(ACTIVATE_TYPE, props<{ uid: string }>());

export const activateSuccess = createAction(ACTIVATE_SUCCESS_TYPE);

export const activateFailure = createAction(
  ACTIVATE_FAILURE_TYPE,
  props<{ error: string }>(),
);
//logout
export const logout = createAction(LOGOUT_TYPE);

export const logoutSuccess = createAction(LOGOUT_SUCCESS_TYPE);

export const logoutFailure = createAction(LOGOUT_FAILURE_TYPE);

export const clearError = createAction(CLEAR_ERROR);
//password recovery
export const passwordRecovery = createAction(
  PASSWORD_RECOVERY_TYPE,
  props<{ email: string }>(),
);

export const passwordRecoverySuccess = createAction(
  PASSWORD_RECOVERY_SUCCESS_TYPE,
);

export const passwordRecoveryFailure = createAction(
  PASSWORD_RECOVERY_FAILURE_TYPE,
  props<{ error: string }>(),
);
//change password
export const passwordChange = createAction(
  PASSWORD_CHANGE_TYPE,
  props<{ password: string; uid: string }>(),
);

export const passwordChangeSuccess = createAction(PASSWORD_CHANGE_SUCCESS_TYPE);

export const passwordChangeFailure = createAction(
  PASSWORD_CHANGE_FAILURE_TYPE,
  props<{ error: string }>(),
);
