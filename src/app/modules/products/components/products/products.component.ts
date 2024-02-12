import { Component } from '@angular/core';
import { Product } from 'src/app/modules/core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products!: Product[];
}
