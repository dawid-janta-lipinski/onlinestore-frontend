import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { SimpleProduct } from 'src/app/modules/core/models/product.model';
import { selectProductsList } from 'src/app/modules/products/store/products.selectors';
import { AppState } from 'src/app/store/app.reducer';
import * as ProductsActions from 'src/app/modules/products/store/products.actions';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-form',
  templateUrl: './delete-product-form.component.html',
  styleUrls: ['./delete-product-form.component.scss'],
})
export class DeleteProductFormComponent implements OnInit {
  products$: Observable<SimpleProduct[]> =
    this.store.select(selectProductsList);

  search: FormControl<string> = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  constructor(
    private notifierService: NotifierService,
    private store: Store<AppState>,
    private productsService: ProductsService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (filter) => {
          this.store.dispatch(
            ProductsActions.fetchProducts({
              value: filter,
              category: '',
              priceMin: 0,
              priceMax: 0,
              pageIndex: 1,
              limit: 5,
              sortItem: 'price',
              order: 'desc',
            }),
          );
        },
      });
  }

  deleteProduct(uuid: string) {
    this.productsService.deleteProduct(uuid).subscribe({
      next: (response) => {
        this.notifierService.notify('success', 'Successfully deleted product!');
      },
      error: (err) => {
        this.notifierService.notify('warning', err);
      },
    });
  }
}
