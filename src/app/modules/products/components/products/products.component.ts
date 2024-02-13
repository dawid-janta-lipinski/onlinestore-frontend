import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  count,
  debounceTime,
  distinctUntilChanged,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { SimpleProduct } from 'src/app/modules/core/models/product.model';
import { ProductsService } from 'src/app/modules/core/services/products.service';
import { AppState } from 'src/app/store/app.reducer';
import * as ProductsActions from '../../store/products.actions';
import {
  selectProductsList,
  selectTotalCount,
} from '../../store/products.selectors';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  products$: Observable<SimpleProduct[]> =
    this.store.select(selectProductsList);
  totalCount$: Observable<number> = this.store.select(selectTotalCount);

  sub!: Subscription;
  filterValue: FormControl<string> = new FormControl('', { nonNullable: true });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  value = '';
  category = '';
  priceMin = 0;
  priceMax = 0;
  pageIndex = 1;
  limit = 10;
  sortItem = 'price';
  order = 'asc';

  constructor(private store: Store<AppState>) {}

  ngAfterViewInit(): void {
    //fetching products
    this.store.dispatch(
      ProductsActions.fetchProducts({
        value: '',
        category: '',
        priceMin: 0,
        priceMax: 0,
        pageIndex: 1,
        limit: 5,
        sortItem: 'price',
        order: 'asc',
      }),
    );

    this.paginator.page.subscribe({
      next: (val: any) => {
        console.log('changing paginator');
        this.store.dispatch(
          ProductsActions.fetchProducts({
            value: '',
            category: '',
            priceMin: 1000,
            priceMax: 0,
            pageIndex: val.pageIndex,
            limit: val.pageSize,
            sortItem: 'price',
            order: 'asc',
          }),
        );
      },
    });

    // If the user changes the sort order, reset back to the first page.
    //    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    //filtering products by input value
    //   this.sub.add(
    //     this.filterValue.valueChanges
    //       .pipe(debounceTime(1000), distinctUntilChanged())
    //       .subscribe((value) => {
    //         console.log(value);
    //         const val = value?.trim();
    //         this.applyFilter(val);
    //       }),
    //   );
    // }
    // applyFilter(val: string) {
    //   const pageIndex = this.paginator.pageIndex + 1;
    //   const itemsPerPage = this.paginator.pageSize;
    //   const sortDirection = this.sort.direction;
    //   const sortProperty = this.sort.active;

    //   this.store.dispatch(
    //     ProductsActions.fetchProducts({
    //       value: val,
    //       category: '',
    //       priceMin: 0,
    //       priceMax: 30,
    //       pageIndex: pageIndex,
    //       limit: itemsPerPage,
    //       sortItem: sortProperty,
    //       order: sortDirection,
    //     }),
    //   );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
