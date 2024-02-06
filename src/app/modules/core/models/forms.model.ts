import { FormControl } from '@angular/forms';

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}
export interface RegisterForm extends LoginForm {
  email: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface PasswordRecoveryForm {
  email: FormControl<string>;
}

export interface ResetPasswordForm {
  password: FormControl<string>;
  repeatedPassword: FormControl<string>;
}
