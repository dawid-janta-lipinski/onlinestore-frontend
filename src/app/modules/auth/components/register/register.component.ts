import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();

  get controls(): RegisterForm{
    return this.registerForm.controls;
  }

  constructor(private formService: FormService){}

  getErrorMessage(control: FormControl){
    return this.formService.getErrorMessage(control);
  }
  
}
