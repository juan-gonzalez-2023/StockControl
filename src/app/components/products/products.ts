import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/services/api/products/products';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe,JsonPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  standalone: true,
})
export class Products implements OnInit {
  private productsList = inject(ProductsList);

  readonly products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productsList.getProductsList().subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error(error),
    });
  }
}