import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface PostCategoryForm {
  category: FormControl<string>;
}
export interface AddProductForm {
  name: FormControl<string>;
  mainDesc: FormControl<string>;
  descHtml: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
  parameters: FormArray<
    FormGroup<{ value: FormControl<string>; key: FormControl<string> }>
  >;
}
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
  category: FormControl<string>;
}
