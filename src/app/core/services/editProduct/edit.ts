import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Products } from '../api/products/products';

@Injectable({
  providedIn: 'root',
})
export class Edit {
  private productsApi = inject(Products);

  putProduct(id: number, product: Product): Observable<Product> {
    return this.productsApi.putProduct(id, product);
  }
}
