import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import * as AuthActions from '../../store/auth.actions';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { selectAuthError } from '../../store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();
  notMatchingPasswordsError: null | string = null;
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);
  get controls(): LoginForm {
    return this.loginForm.controls;
  }

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
  onLogin() {
    this.store.dispatch(
      AuthActions.login({ loginData: this.loginForm.getRawValue() }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
