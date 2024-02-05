import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup<ResetPasswordForm> = this.formService.initResetPasswordForm();

  uid!: string | null;

  get controls(): ResetPasswordForm {
    return this.resetPasswordForm.controls;
  }

  constructor(private formService: FormService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (paramMap) => {
        this.uid = (paramMap.get('uid'))
      }
    });
  }

  getErrorMessage(control: FormControl){
    return this.formService.getErrorMessage(control);
  }
}
