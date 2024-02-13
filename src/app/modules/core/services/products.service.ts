import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GetProductsResponse,
  Product,
  SimpleProduct,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  getProducts(
    value: string,
    category: string,
    priceMin: number,
    priceMax: number,
    pageIndex: number,
    limit: number,
    sortItem: string,
    order: string,
  ): Observable<GetProductsResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', limit);
    if (value) {
      params = params.append('name_like', value);
    }
    if (category) {
      params = params.append('_category', category);
    }
    if (priceMin) {
      params = params.append('price_min', priceMin);
    }
    if (priceMax) {
      params = params.append('price_max', priceMax);
    }
    if (sortItem) {
      params = params.append('_sort', sortItem).append('_order', order);
    }

    return this.http
      .get<SimpleProduct[]>(this.apiUrl, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (!response.body) return { products: [], totalCount: 0 };

          const totalCount = Number(response.headers.get('X-Total-Count'));

          const productsArr: SimpleProduct[] = response.body;

          return { products: productsArr, totalCount: totalCount };
        }),
      );
  }
}
