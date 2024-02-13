import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthLoading } from 'src/app/modules/auth/store/auth.selectors';
import { Observable, merge } from 'rxjs';
import { selectProductsLoading } from 'src/app/modules/products/store/products.selectors';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  loading$: Observable<boolean> = merge(
    this.store.select(selectAuthLoading),
    this.store.select(selectProductsLoading),
  );
  constructor(private store: Store<AppState>) {}
}
