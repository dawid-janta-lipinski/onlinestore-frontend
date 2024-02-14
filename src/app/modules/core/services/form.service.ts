import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginForm,
  PasswordRecoveryForm,
  ResetPasswordForm,
  SearchingForm,
} from '../models/forms.model';
import { RegisterForm } from '../models/forms.model';
import { equivalentValidator } from '../../shared/validators/equivalent.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  initSearchingForm(): FormGroup<SearchingForm> {
    return new FormGroup({
      filter: new FormControl('', { nonNullable: true }),
      priceMin: new FormControl(0, { nonNullable: true }),
      priceMax: new FormControl(0, { nonNullable: true }),
      sortBy: new FormControl('', { nonNullable: true }),
    });
  }
  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
    });
  }
  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        login: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ],
          nonNullable: true,
        }),
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(75),
          ],
          nonNullable: true,
        }),
        repeatedPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(75),
          ],
          nonNullable: true,
        }),
      },
      // {
      //   validators: [equivalentValidator('password', 'repeatedPassword')],
      // },
    );
  }
  initRecoveryForm(): FormGroup<PasswordRecoveryForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
    });
  }
  initResetPasswordForm(): FormGroup<ResetPasswordForm> {
    return new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(75),
          ],
          nonNullable: true,
        }),
        repeatedPassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(75),
          ],
          nonNullable: true,
        }),
      },
      {
        validators: [equivalentValidator('password', 'repeatedPassword')],
      },
    );
  }
  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is requierd';
    }
    if (control.hasError('email')) {
      return 'This field should be an email.';
    }
    if (control.hasError('minlength')) {
      return `Min. character number: ${control.errors?.['minlength']?.requiredLength}.`;
    }
    if (control.hasError('maxlength')) {
      return `Max character number: ${control.errors?.['maxlength']?.requiredLength}.`;
    }
    if (control.hasError('passwordsNotMaching')) {
      return 'Passwords are not the same';
    }
    return '';
  }
}
