import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Product, Products } from '../api/products/products';

const CREATED_STORAGE_KEY = 'stockcontrol_created_products';
const OVERRIDES_STORAGE_KEY = 'stockcontrol_product_overrides';
const DELETED_STORAGE_KEY = 'stockcontrol_deleted_products';

@Injectable({
  providedIn: 'root',
})
export class ProductsList {
  private productsApi = inject(Products);
  private platformId = inject(PLATFORM_ID);

  readonly products = signal<Product[]>([]);
  readonly searchQuery = signal('');

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  getProductsList() {
    return this.productsApi.getProducts().pipe(
      map((apiProducts) => this.mergeProducts(apiProducts)),
      tap((products) => this.products.set(products)),
    );
  }

  addProduct(product: Product): void {
    const stored = [...this.readCreatedProducts(), product];
    this.persistCreatedProducts(stored);
    this.products.update((list) => [...list, product]);
  }

  updateProduct(product: Product): void {
    if (this.isUserCreated(product.id)) {
      const stored = this.readCreatedProducts().map((p) => (p.id === product.id ? product : p));
      this.persistCreatedProducts(stored);
    } else {
      const overrides = this.readOverrides();
      overrides[product.id] = product;
      this.persistOverrides(overrides);
    }

    this.products.update((list) => list.map((p) => (p.id === product.id ? product : p)));
  }

  removeProduct(id: number): void {
    if (this.isUserCreated(id)) {
      const stored = this.readCreatedProducts().filter((p) => p.id !== id);
      this.persistCreatedProducts(stored);
    } else {
      const deleted = this.readDeletedIds();
      if (!deleted.includes(id)) {
        this.persistDeletedIds([...deleted, id]);
      }

      const overrides = this.readOverrides();
      delete overrides[id];
      this.persistOverrides(overrides);
    }

    this.products.update((list) => list.filter((p) => p.id !== id));
  }

  getNextId(): number {
    const ids = [...this.products(), ...this.readCreatedProducts()].map((p) => p.id);
    if (ids.length === 0) return 1;
    return Math.max(...ids) + 1;
  }

  private mergeProducts(apiProducts: Product[]): Product[] {
    const overrides = this.readOverrides();
    const created = this.readCreatedProducts();
    const deleted = new Set(this.readDeletedIds());
    const apiIds = new Set(apiProducts.map((p) => p.id));

    const mergedApi = apiProducts
      .filter((p) => !deleted.has(p.id))
      .map((p) => overrides[p.id] ?? p);
    const mergedCreated = created
      .map((p) => overrides[p.id] ?? p)
      .filter((p) => !apiIds.has(p.id));

    return [...mergedApi, ...mergedCreated];
  }

  private isUserCreated(id: number): boolean {
    return this.readCreatedProducts().some((p) => p.id === id);
  }

  private readOverrides(): Record<number, Product> {
    if (!isPlatformBrowser(this.platformId)) return {};

    try {
      const raw = localStorage.getItem(OVERRIDES_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<number, Product>) : {};
    } catch {
      return {};
    }
  }

  private persistOverrides(overrides: Record<number, Product>): void {
    this.writeStorage(OVERRIDES_STORAGE_KEY, overrides);
  }

  private readCreatedProducts(): Product[] {
    return this.readProductList(CREATED_STORAGE_KEY);
  }

  private persistCreatedProducts(products: Product[]): void {
    this.writeStorage(CREATED_STORAGE_KEY, products);
  }

  private readDeletedIds(): number[] {
    return this.readIdList(DELETED_STORAGE_KEY);
  }

  private persistDeletedIds(ids: number[]): void {
    this.writeStorage(DELETED_STORAGE_KEY, ids);
  }

  private readProductList(key: string): Product[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  }

  private readIdList(key: string): number[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  }

  private writeStorage(key: string, value: unknown): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(key, JSON.stringify(value));
  }
}
