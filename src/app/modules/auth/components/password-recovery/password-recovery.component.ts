import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordRecoveryForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthError } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent {
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);
  passwordRecoveryForm: FormGroup<PasswordRecoveryForm> =
    this.formService.initRecoveryForm();

  get controls(): PasswordRecoveryForm {
    return this.passwordRecoveryForm.controls;
  }

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }
  onPasswordRecovery() {
    this.store.dispatch(
      AuthActions.passwordRecovery(this.passwordRecoveryForm.getRawValue()),
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
