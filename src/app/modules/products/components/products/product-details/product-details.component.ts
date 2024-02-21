import { Component, OnInit } from '@angular/core';
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
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product | null> = this.store.select(
    selectProductsProduct,
  );
  parsedParameters: any;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.product$.subscribe((product) => {
      if (product && product.parameters) {
        this.parsedParameters = JSON.parse(product.parameters);
        console.log(this.parsedParameters);
      }
    });
  }
}
