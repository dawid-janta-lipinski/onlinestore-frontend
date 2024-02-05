import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equivalentValidator = (passwordControlName: string, repeatedPasswordControlName: string): 
    ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(passwordControlName);
            const repeatedPassword = control.get(repeatedPasswordControlName);
            if(repeatedPassword?.value && repeatedPassword.value !== password?.value){
                repeatedPassword.setErrors({
                    passwordsNotMaching: true
                })
            }
            return null;
        }
}