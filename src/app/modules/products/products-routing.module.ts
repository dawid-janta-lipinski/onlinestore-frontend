import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  {
    path: 'products/:name',
    component: ProductDetailsComponent,
    title: ':name',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
