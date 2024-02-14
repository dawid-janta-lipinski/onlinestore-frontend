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

export interface SearchingForm {
  filter: FormControl<string>;
  priceMin: FormControl<number>;
  priceMax: FormControl<number>;
  sortBy: FormControl<string>;
}
