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
import { AppState } from 'src/app/store/app.reducer';
import * as ProductsActions from '../../store/products.actions';
import {
  selectProductsList,
  selectTotalCount,
} from '../../store/products.selectors';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { FormService } from 'src/app/modules/core/services/form.service';
import { SearchingForm } from 'src/app/modules/core/models/forms.model';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchingForm: FormGroup<SearchingForm> =
    this.formService.initSearchingForm();

  get controls(): SearchingForm {
    return this.searchingForm.controls;
  }

  constructor(
    private store: Store<AppState>,
    private formService: FormService,
  ) {}

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
        order: 'desc',
      }),
    );

    this.sub = merge(
      this.searchingForm.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      ),
      this.paginator.page,
    ).subscribe({
      next: (value) => {
        const { sortOrder, sortParam } = this.getSortingParams(
          value.toString(),
        );
        this.store.dispatch(
          ProductsActions.fetchProducts({
            value: this.controls.filter.getRawValue(),
            category: '',
            priceMin: this.controls.priceMin.getRawValue(),
            priceMax: this.controls.priceMax.getRawValue(),
            pageIndex: this.paginator.pageIndex + 1,
            limit: this.paginator.pageSize,
            sortItem: sortParam,
            order: sortOrder,
          }),
        );
      },
    });

    this.sub.add(
      this.searchingForm.valueChanges.subscribe({
        next: (value) => (this.paginator.pageIndex = 0),
      }),
    );
  }

  getSortingParams(value: string) {
    if (value === 'NameAsc') return { sortParam: 'name', sortOrder: 'asc' };
    if (value === 'NameDesc') return { sortParam: 'name', sortOrder: 'desc' };
    if (value === 'CategoryAsc')
      return { sortParam: 'category', sortOrder: 'asc' };
    if (value === 'CategoryDesc')
      return { sortParam: 'category', sortOrder: 'desc' };
    if (value === 'DateAsc') return { sortParam: 'date', sortOrder: 'asc' };
    if (value === 'DateDesc') return { sortParam: 'date', sortOrder: 'desc' };
    if (value === 'PriceAsc') return { sortParam: 'price', sortOrder: 'asc' };
    if (value === 'PriceDesc') return { sortParam: 'price', sortOrder: 'desc' };
    return { sortParam: 'price', sortOrder: 'desc' };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
