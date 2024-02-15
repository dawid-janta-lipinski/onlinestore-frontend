import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import * as AuthActions from '../../store/auth.actions';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();

  notMatchingPasswordsError: null | string = null;

  get controls(): RegisterForm {
    return this.registerForm.controls;
  }

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
  onRegister() {
    const { email, login, password, repeatedPassword } =
      this.registerForm.getRawValue();
    if (password !== repeatedPassword) {
      this.notMatchingPasswordsError = 'Passwords cannot be different!';
      return;
    }

    this.store.dispatch(
      AuthActions.register({
        registerData: { login, email, password, role: 'USER' },
      }),
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
