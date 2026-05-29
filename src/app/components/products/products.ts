import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../core/services/api/products/products';
import { ProductsList } from '../../core/services/productsList/products-list';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements OnInit {
  private productsList = inject(ProductsList);

  readonly products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productsList.getProductsList().subscribe({
      next: (products) => {this.products.set(products); console.log(this.products())},
      error: (error) => console.error(error),
    });
  }
}