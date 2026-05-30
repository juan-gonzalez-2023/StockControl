import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

@Injectable({
  providedIn: 'root',
})



export class Products {
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }


} 
