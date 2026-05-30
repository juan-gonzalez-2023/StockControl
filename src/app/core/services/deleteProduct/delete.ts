import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Products } from '../api/products/products';

@Injectable({
  providedIn: 'root',
})
export class Delete {
  private productsApi = inject(Products);

  deleteProduct(id: number): Observable<Product> {
    return this.productsApi.deleteProduct(id);
  }
}
