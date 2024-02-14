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
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null> = this.store.select(selectAuthUser);
  categories$: Observable<Category[] | null> =
    this.store.select(selectCategories);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.fetchCategories());
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
