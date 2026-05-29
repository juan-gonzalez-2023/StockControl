import { inject, Injectable } from '@angular/core';
import { Products } from '../api/products/products';

@Injectable({
  providedIn: 'root',
})
export class Create {
  private createProduct = inject(Products);
}
