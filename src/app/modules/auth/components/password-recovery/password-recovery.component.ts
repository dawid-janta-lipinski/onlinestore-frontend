import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordRecoveryForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {

  passwordRecoveryForm: FormGroup<PasswordRecoveryForm> = this.formService.initRecoveryForm();

  get controls(): PasswordRecoveryForm {
    return this.passwordRecoveryForm.controls;
  }

  constructor(private formService: FormService){}

  getErrorMessage(control: FormControl): string{
    return this.formService.getErrorMessage(control);
  }

}
