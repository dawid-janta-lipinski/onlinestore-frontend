import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryFormComponent } from './components/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AddProductFormComponent } from './components/administrator/manage-products/add-product-form/add-product-form.component';
import { DeleteProductFormComponent } from './components/administrator/manage-products/delete-product-form/delete-product-form.component';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
    AddProductFormComponent,
    DeleteProductFormComponent,
  ],
  imports: [SharedModule, CoreModule, AdministrationRoutingModule],
})
export class AdministrationModule {}
