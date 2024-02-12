import { Injectable } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productSerivce: ProductsService,
  ) {}

  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchProducts),
      switchMap((action) => {
        return this.productSerivce.getProducts().pipe(
          map((products) => ProductsActions.fetchProductsSuccess({ products })),
          catchError((err) =>
            of(
              ProductsActions.fetchProductsFailure({
                error: 'an error occurd',
              }),
            ),
          ),
        );
      }),
    );
  });
}
