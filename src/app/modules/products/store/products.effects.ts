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
      switchMap(
        ({
          value,
          category,
          priceMin,
          priceMax,
          pageIndex,
          limit,
          sortItem,
          order,
        }) => {
          console.log('we are in effect, before http request');
          return this.productSerivce
            .getProducts(
              value,
              category,
              priceMin,
              priceMax,
              pageIndex,
              limit,
              sortItem,
              order,
            )
            .pipe(
              map((response) => ProductsActions.fetchProductsSuccess(response)),
              catchError((err) =>
                of(
                  ProductsActions.fetchProductsFailure({
                    error: 'an error occurd',
                  }),
                ),
              ),
            );
        },
      ),
    );
  });
}
