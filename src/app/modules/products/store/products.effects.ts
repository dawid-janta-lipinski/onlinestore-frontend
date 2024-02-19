import { Injectable } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productSerivce: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private notifierService: NotifierService,
  ) {}

  fetchSingleProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchSingleProduct),
      switchMap(({ uuid }) => {
        return this.productSerivce.getSingleProduct(uuid).pipe(
          map((product) => {
            const encodedName = encodeURIComponent(product.name);
            this.router.navigate([`products/${encodedName}`]);
            return ProductsActions.fetchSingleProductSuccess({
              product: product,
            });
          }),
          catchError((err) =>
            of(
              ProductsActions.fetchSingleProductFailure({
                error: 'an error occurd',
              }),
            ),
          ),
        );
      }),
    );
  });

  postCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.postCategory),
      switchMap((category) =>
        this.categoryService.postCategory(category).pipe(
          map(() => {
            this.notifierService.notify(
              'success',
              'Successfully added new category!',
            );
            return ProductsActions.postCategorySuccess();
          }),
          catchError((err) =>
            of(
              ProductsActions.postCategoryFailure({
                error: err.message || 'An error occurred',
              }),
            ),
          ),
        ),
      ),
    );
  });

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
                    error: 'An error occurd',
                  }),
                ),
              ),
            );
        },
      ),
    );
  });

  fetchCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.fetchCategories),
      switchMap(() => {
        return this.categoryService.getCategories().pipe(
          map((categoriesList) =>
            ProductsActions.fetchCategoriesSucces({
              categories: categoriesList,
            }),
          ),
          catchError((err) =>
            of(
              ProductsActions.fetchCategoriesFailure({
                error: 'an error occurd',
              }),
            ),
          ),
        );
      }),
    );
  });
}
