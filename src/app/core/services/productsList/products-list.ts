import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Product, Products } from '../api/products/products';

const STORAGE_KEY = 'stockcontrol_created_products';

@Injectable({
  providedIn: 'root',
})
export class ProductsList {
  private productsApi = inject(Products);
  private platformId = inject(PLATFORM_ID);

  readonly products = signal<Product[]>([]);

  getProductsList() {
    return this.productsApi.getProducts().pipe(
      map((apiProducts) => [...apiProducts, ...this.readStoredProducts()]),
      tap((products) => this.products.set(products)),
    );
  }

  addProduct(product: Product): void {
    const stored = [...this.readStoredProducts(), product];
    this.persistProducts(stored);
    this.products.update((list) => [...list, product]);
  }

  getNextId(): number {
    const ids = [...this.products(), ...this.readStoredProducts()].map((p) => p.id);
    if (ids.length === 0) return 1;
    return Math.max(...ids) + 1;
  }

  private readStoredProducts(): Product[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  }

  private persistProducts(products: Product[]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
}
