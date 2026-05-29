import { inject, Injectable } from '@angular/core';
import { Product, Products } from '../api/products/products';
@Injectable({
  providedIn: 'root',
})
export class ProductsList {
  
private products = inject(Products);
  getProductsList(){
    return this.products.getProducts();
  }
}
