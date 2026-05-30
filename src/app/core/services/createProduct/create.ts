import { inject, Injectable } from '@angular/core';
import { CreateProduct, Product, Products } from '../api/products/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Create {
  private createProduct = inject(Products);
  postProduct(product: CreateProduct): Observable<Product> {
    return this.createProduct.postProduct(product);
  }
}
