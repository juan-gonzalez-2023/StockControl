import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Product, Products } from '../api/products/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsList {
  private productsApi = inject(Products);

  readonly products = signal<Product[]>([]);

  getProductsList() {
    return this.productsApi.getProducts().pipe(tap((products) => this.products.set(products)));
  }

  addProduct(product: Product): void {
    this.products.update((list) => [...list, product]);
  }

  getNextId(): number {
    const list = this.products();
    if (list.length === 0) return 1;
    return Math.max(...list.map((p) => p.id)) + 1;
  }
}
