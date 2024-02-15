import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { selectProductsProduct } from '../../../store/products.selectors';
import { Product } from 'src/app/modules/core/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product$: Observable<Product | null> = this.store.select(
    selectProductsProduct,
  );

  constructor(private store: Store<AppState>) {}
}
