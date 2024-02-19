import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostCategoryForm } from 'src/app/modules/core/models/forms.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { AppState } from 'src/app/store/app.reducer';
import * as PoductsActions from '../../../../products/store/products.actions';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss'],
})
export class AddCategoryFormComponent {
  postCategoryForm: FormGroup<PostCategoryForm> =
    this.formService.initAddCategoryForm();

  get controls(): PostCategoryForm {
    return this.postCategoryForm.controls;
  }

  constructor(
    private formService: FormService,
    private store: Store<AppState>,
  ) {}

  onAddCategory() {
    this.store.dispatch(
      PoductsActions.postCategory({
        name: this.controls.category.getRawValue(),
      }),
    );
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
}
