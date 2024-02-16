import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';
import * as ProductsActions from '../../../products/store/products.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';
import { selectAuthUser } from 'src/app/modules/auth/store/auth.selectors';
import { Category } from '../../models/categories.model';
import { selectCategories } from 'src/app/modules/products/store/products.selectors';
import { selectProductsProduct } from 'src/app/modules/products/store/products.selectors';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null> = this.store.select(selectAuthUser);
  // product$: Observable<Product | null> = this.store.select(
  //   selectProductsProduct,
  // );
  categories$: Observable<Category[] | null> =
    this.store.select(selectCategories);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.fetchCategories());
    // this.product$.subscribe({
    //   next: (product) => console.log(product),
    // });
  }

  setCategory(category: Category) {
    this.store.dispatch(ProductsActions.setCategory({ category: category }));
  }
  clearCategory() {
    this.store.dispatch(ProductsActions.clearCategory());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
