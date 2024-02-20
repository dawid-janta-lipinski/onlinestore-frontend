import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AddProductForm } from 'src/app/modules/core/models/forms.model';
import { Image } from 'src/app/modules/core/models/image.model';
import { FormService } from 'src/app/modules/core/services/form.service';
import { ImageService } from 'src/app/modules/core/services/image.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent {
  selectedFile: File | null = null;
  fileName = '';
  imageUrls: Image[] = [];
  errorimageUploadMsg: string | null = null;

  addProductForm: FormGroup<AddProductForm> =
    this.formService.initAddProductForm();

  get controls(): AddProductForm {
    return this.addProductForm.controls;
  }

  constructor(
    private notifierService: NotifierService,
    private imageService: ImageService,
    private formService: FormService,
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
          console.log(this.imageUrls);
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
  onAddProduct() {}
}
