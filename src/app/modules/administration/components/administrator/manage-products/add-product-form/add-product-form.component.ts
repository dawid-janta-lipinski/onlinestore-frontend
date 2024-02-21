import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modules/core/models/categories.model';
import { AddProductForm } from 'src/app/modules/core/models/forms.model';
import { Image } from 'src/app/modules/core/models/image.model';
import { ProductForm } from 'src/app/modules/core/models/product.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { ImageService } from 'src/app/modules/core/services/image.service';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { selectCategories } from 'src/app/modules/products/store/products.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
  config: AngularEditorConfig = this.imageService.config;

  categories$: Observable<Category[]> = this.store.select(selectCategories);
  selectedFile: File | null = null;
  fileName = '';
  imageUrls: Image[] = [];
  errorimageUploadMsg: string | null = null;

  addProductForm: FormGroup<AddProductForm> =
    this.formService.initAddProductForm();

  get controls(): AddProductForm {
    return this.addProductForm.controls;
  }

  get parameters(): FormArray<
    FormGroup<{ value: FormControl<string>; key: FormControl<string> }>
  > {
    return this.addProductForm.controls.parameters;
  }

  constructor(
    private notifierService: NotifierService,
    private imageService: ImageService,
    private formService: FormService,
    private productsService: ProductsService,
    private store: Store<AppState>,
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
    }
  }
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('multipartFile', this.selectedFile);

      this.imageService.addImage(formData).subscribe({
        next: (response) => {
          this.imageUrls = [...this.imageUrls, { ...response }];
        },
        error: (err) => {
          this.notifierService.notify('warning', err);
          this.errorimageUploadMsg = err;
        },
      });
    }
  }
  setActiveImageUrls(imageArr: Image[]) {
    this.imageUrls = [...imageArr];
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  deleteParameter(i: number) {
    if (i === 0) return;
    this.parameters.removeAt(i);
  }
  addParameter() {
    console.log(this.imageUrls);
    const group = new FormGroup({
      key: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      value: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.parameters.push(group);
  }

  onAddProduct() {
    const formValue = this.addProductForm.getRawValue();
    const parametersObject: { [key: string]: string } = {};

    formValue.parameters.forEach((item) => {
      parametersObject[item.key] = item.value;
    });

    const parameters = `${JSON.stringify(parametersObject)}`;

    const imageUuids = this.imageUrls.map((url) => url.url);

    const productForm: ProductForm = {
      ...formValue,
      parameters,
      imageUuids,
    };

    this.productsService.addProduct(productForm).subscribe({
      next: () => {
        this.addProductForm.reset();
        this.imageUrls = [];
        this.notifierService.notify(
          'success',
          'Successfully added new product!',
        );
      },
      error: (err) => {
        this.notifierService.notify('warning', err);
      },
    });
  }
}
