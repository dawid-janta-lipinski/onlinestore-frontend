import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthError } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);

  resetPasswordForm: FormGroup<ResetPasswordForm> =
    this.formService.initResetPasswordForm();

  uid = '';

  get controls(): ResetPasswordForm {
    return this.resetPasswordForm.controls;
  }

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramMap) => {
        this.uid = paramMap.get('uid') as string;
      },
    });
  }
  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onChangePassword() {
    const { password } = this.resetPasswordForm.getRawValue();
    this.store.dispatch(
      AuthActions.passwordChange({ password, uid: this.uid }),
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
