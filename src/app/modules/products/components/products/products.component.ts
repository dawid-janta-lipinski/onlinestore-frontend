import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SimpleProduct } from 'src/app/modules/core/models/product.model';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { AppState } from 'src/app/store/app.reducer';
import * as ProductsActions from '../../store/products.actions';
import { selectProductsList } from '../../store/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  products: SimpleProduct[] = [];
  sub!: Subscription;

  constructor(
    private productsServie: ProductsService,
    private store: Store<AppState>,
  ) {}

  ngAfterViewInit(): void {
    this.store.dispatch(ProductsActions.fetchProducts());

    // this.sub = this.productsServie.getProducts().subscribe({
    //   next: (products) => {
    //     this.products = products ? [...products] : [];
    //     console.log(products);
    //   },
    // });

    this.sub = this.store.select(selectProductsList).subscribe({
      next: (products) => {
        console.log(products);
        this.products = products ? [...products] : [];
      },
    });
  }
}
