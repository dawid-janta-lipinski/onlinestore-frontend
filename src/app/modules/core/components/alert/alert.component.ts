import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, merge } from 'rxjs';
import { selectAuthError } from 'src/app/modules/auth/store/auth.selectors';
import { selectProductsError } from 'src/app/modules/products/store/products.selectors';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  errorMessage$: Observable<string | null> = merge(
    this.store.select(selectAuthError),
    this.store.select(selectProductsError),
  );

  constructor(private store: Store<AppState>) {}
}
